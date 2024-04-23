import {
  MessageDeletionResponse,
  MessageHistoryResponse,
  MessageReadStatusResponse,
  MessageResponse,
  SendingMessageResponse,
} from 'Interfaces/ws-response';
import { TypeName } from 'Enums/type.name';
import { requestMessageHistory, requestMessageReadStatusChange } from 'Utils/request';
import { socketService } from '../socket-service';
import { Observable } from '../observable';
import { loginService } from './login-service';

export interface UnreadMessagesNumber {
  [user: string]: number;
}

export class MessageService {
  private messageHistory = new Observable<MessageResponse[]>([]);

  private openChatUser = new Observable<string>('');

  private unreadMessagesNumber = new Observable<UnreadMessagesNumber>({});

  constructor() {
    socketService.subscribe(TypeName.msgSend, this.onMsgSend);
    socketService.subscribe(TypeName.msgFromUser, this.onMsgFromUser);
    socketService.subscribe(TypeName.msgRead, this.onMsgRead);
    socketService.subscribe(TypeName.msgDelete, this.onMsgDelete);
  }

  private onMsgSend = (response: SendingMessageResponse) => {
    const recipient = response.payload.message.from;

    requestMessageHistory(this.openChatUser.getValue());

    this.unreadMessagesNumber.notify((prev) => {
      const newObj = { ...prev };
      if (recipient in prev) newObj[recipient] += 1;
      else newObj[recipient] = 1;

      return newObj;
    });
  };

  private onMsgFromUser = (response: MessageHistoryResponse) => {
    if (!response.id) {
      this.messageHistory.notify(() => response.payload.messages);
    }

    if (response.id && response.id !== loginService.getLogin()) {
      this.unreadMessagesNumber.notify((prev) => {
        const newObj = { ...prev };
        if (response.id && response.id in prev) return prev;
        response.payload.messages.forEach((msg) => {
          if (msg.from !== loginService.getLogin() && !msg.status.isReaded) {
            if (msg.from in prev) {
              newObj[msg.from] += 1;
            } else {
              newObj[msg.from] = 1;
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
        this.unreadMessagesNumber.notify((prev) => {
          const newObj = { ...prev };
          if (message.from in prev) delete newObj[message.from];
          return newObj;
        });
      }
    });
  };

  private onMsgDelete = (response: MessageDeletionResponse) => {
    this.messageHistory.notify((prev) => {
      prev.forEach((message, i) => {
        if (message.id === response.payload.message.id) {
          if (!message.status.isReaded) {
            this.unreadMessagesNumber.notify((prevNumber) => {
              // eslint-disable-next-line no-param-reassign
              prevNumber[message.from] -= 1;
              return prevNumber;
            });
          }
        }
        prev.splice(i, 1);
      });

      return prev;
    });
  };

  subscribeHistoryMessage(callback: (messages: MessageResponse[]) => void) {
    this.messageHistory.subscribe(callback);
  }

  unsubscribeHistoryMessage(callback: (messages: MessageResponse[]) => void) {
    this.messageHistory.unsubscribe(callback);
  }

  subscribeOpenChatUser(callback: (user: string) => void) {
    this.openChatUser.subscribe(callback);
  }

  notifyOpenChatUser(user: string) {
    this.openChatUser.notify(user);
  }

  getOpenChatUser() {
    return this.openChatUser.getValue();
  }

  subscribeUnreadMessagesNumber(callback: (unreadMsgNumber: UnreadMessagesNumber) => void) {
    this.unreadMessagesNumber.subscribe(callback, true);
  }

  unsubscribeUnreadMessagesNumber(callback: (messages: UnreadMessagesNumber) => void) {
    this.unreadMessagesNumber.unsubscribe(callback);
  }
}

export const messageService = new MessageService();
