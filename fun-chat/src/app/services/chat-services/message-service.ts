import {
  MessageDeletionResponse,
  MessageHistoryResponse,
  MessageReadStatusResponse,
  MessageResponse,
  MessageTextEditingResponse,
  SendingMessageResponse,
} from 'Interfaces/ws-response';
import { TypeName } from 'Enums/type.name';
import { requestMessageHistory, requestMessageReadStatusChange } from 'Utils/requests';
import { socketService } from '../socket-service';
import { Observable } from '../observable';
import { loginService } from './login-service';

export interface UnreadMessages {
  [user: string]: MessageResponse[];
}

interface EditText {
  [id: string]: string;
}

export class MessageService {
  private messageHistory = new Observable<MessageResponse[]>([]);

  private openChatUser = new Observable<string>('');

  private unreadMessages = new Observable<UnreadMessages>({});

  private editText = new Observable<EditText>({});

  constructor() {
    socketService.subscribe(TypeName.msgSend, this.onMsgSend);
    socketService.subscribe(TypeName.msgFromUser, this.onMsgFromUser);
    socketService.subscribe(TypeName.msgRead, this.onMsgRead);
    socketService.subscribe(TypeName.msgDelete, this.onMsgDelete);
    socketService.subscribe(TypeName.msgEdit, this.onMsgEdit);
  }

  private onMsgSend = (response: SendingMessageResponse) => {
    const { message } = response.payload;
    const recipient = message.from;

    requestMessageHistory(this.openChatUser.getValue());

    this.unreadMessages.notify((prevUnreadMessages) => {
      const updatedMessages = prevUnreadMessages[recipient]
        ? [...prevUnreadMessages[recipient], message]
        : [message];

      return {
        ...prevUnreadMessages,
        [recipient]: updatedMessages,
      };
    });
  };

  private onMsgFromUser = (response: MessageHistoryResponse) => {
    const { id } = response;
    if (!id) {
      this.messageHistory.notify(() => response.payload.messages);
    }

    if (id && id !== loginService.getLogin()) {
      this.unreadMessages.notify((prevUnreadMessages) => {
        const newObj = { ...prevUnreadMessages };
        if (id in prevUnreadMessages) return prevUnreadMessages;

        response.payload.messages.forEach((msg) => {
          const msgFrom = msg.from;

          if (msgFrom !== loginService.getLogin() && !msg.status.isReaded) {
            if (msgFrom in prevUnreadMessages) {
              newObj[msgFrom].push(msg);
            } else {
              newObj[msgFrom] = [msg];
            }
          }
        });
        return newObj;
      });
    }
  };

  readMessages() {
    this.messageHistory.getValue().forEach((message) => {
      if (message.to === loginService.getLogin()) {
        requestMessageReadStatusChange(message.id);
      }
    });
  }

  private onMsgRead = (response: MessageReadStatusResponse) => {
    requestMessageHistory(this.openChatUser.getValue());

    this.messageHistory.getValue().forEach((message) => {
      if (message.id === response.payload.message.id) {
        this.unreadMessages.notify((prevUnreadMessages) => {
          const newObj = { ...prevUnreadMessages };

          if (message.from in prevUnreadMessages) delete newObj[message.from];

          return newObj;
        });
      }
    });
  };

  private onMsgDelete = (response: MessageDeletionResponse) => {
    this.messageHistory.notify((prev) => {
      prev.forEach((msg, i) => {
        if (msg.id === response.payload.message.id) {
          prev.splice(i, 1);
        }
      });

      return prev;
    });

    this.unreadMessages.notify((prev) => {
      Object.values(prev).forEach((msgs) => {
        msgs.forEach((msg, i) => {
          if (msg.id === response.payload.message.id) {
            msgs.splice(i, 1);
          }
        });
      });
      return prev;
    });
  };

  private onMsgEdit = (response: MessageTextEditingResponse) => {
    this.messageHistory.notify((prev) => {
      return prev.map((msg) => {
        if (msg.id === response.payload.message.id) {
          return {
            ...msg,
            text: response.payload.message.text,
            status: {
              ...msg.status,
              isEdited: true,
            },
          };
        }
        return msg;
      });
    });
  };

  changeSendStatus(user: string) {
    if (this.openChatUser.getValue() === user) {
      this.messageHistory.notify((prev) =>
        prev.map((msg) => ({
          ...msg,
          status: {
            ...msg.status,
            isDelivered: true,
          },
        })),
      );
    }
  }

  subscribeMessageHistory(callback: (messages: MessageResponse[]) => void) {
    this.messageHistory.subscribe(callback);
  }

  unsubscribeMessageHistory(callback: (messages: MessageResponse[]) => void) {
    this.messageHistory.unsubscribe(callback);
  }

  notifyOpenChatUser(user: string) {
    this.openChatUser.notify(user);
  }

  getOpenChatUser() {
    return this.openChatUser.getValue();
  }

  subscribeUnreadMessages(callback: (unreadMsgNumber: UnreadMessages) => void) {
    this.unreadMessages.subscribe(callback, true);
  }

  unsubscribeUnreadMessages(callback: (messages: UnreadMessages) => void) {
    this.unreadMessages.unsubscribe(callback);
  }

  changeEditText(editText: EditText) {
    this.editText.notify(editText);
  }

  getEditText() {
    return this.editText.getValue();
  }

  subscribeEditState(callback: (editText: EditText) => void) {
    this.editText.subscribe(callback, true);
  }
}

export const messageService = new MessageService();
