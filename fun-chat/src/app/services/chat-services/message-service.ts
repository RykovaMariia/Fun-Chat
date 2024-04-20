import {
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

  constructor() {
    socketService.subscribe(TypeName.msgFromUser, this.onMsgFromUser);
    // this.openChatUser.subscribe((user) => console.log(this.openChatUser));
    socketService.subscribe(TypeName.msgSend, this.onMsgSend);
    socketService.subscribe(TypeName.msgRead, this.onMsgRead);
  }

  private onMsgFromUser = (response: MessageHistoryResponse) => {
    if (response.payload.messages) this.messageHistory.notify(() => response.payload.messages);
  };

  private onMsgSend = (response: SendingMessageResponse) => {
    const recipient = response.payload.message.from;
    const sender = response.payload.message.from;

    if (recipient === this.openChatUser.getValue() || sender === loginService.getLogin()) {
      requestMessageHistory(this.openChatUser.getValue());
    }
    // else {
    //   this.unreadMessagesNumber.notify((prev) => {
    //     const newObj = { ...prev };
    //     if (recipient in prev) newObj[recipient] += 1;
    //     else newObj[recipient] = 1;

    //     return newObj;
    //   });
    // }
  };

  readMessages() {
    this.messageHistory.getValue().forEach((message) => {
      if (message.to === loginService.getLogin()) {
        requestMessageReadStatusChange(message.id);
        requestMessageHistory(this.openChatUser.getValue());
      }
    });
  }

  private onMsgRead = (response: MessageReadStatusResponse) => {
    const recipient = response.payload.message.from;

    if (recipient === this.openChatUser.getValue()) {
      requestMessageHistory(this.openChatUser.getValue());
    }
    // else {
    //   this.unreadMessagesNumber.notify((prev) => {
    //     const newObj = { ...prev };
    //     if (recipient in prev) newObj[recipient] += 1;
    //     else newObj[recipient] = 1;

    //     return newObj;
    //   });
    // }
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
}

export const messageService = new MessageService();
