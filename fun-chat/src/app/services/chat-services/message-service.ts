import { MessageHistoryResponse, MessageResponse } from 'Interfaces/ws-response';
import { TypeName } from 'Enums/type.name';
import { socketService } from '../socket-service';
import { Observable } from '../observable';

export interface UnreadMessagesNumber {
  [user: string]: number;
}

export class MessageService {
  private messageHistory = new Observable<MessageResponse[]>([]);

  private openChatUser = new Observable<string>('');

  private unreadMessagesNumber = new Observable<UnreadMessagesNumber>({});

  constructor() {
    socketService.subscribe(TypeName.msgFromUser, this.onMsgFromUser);
    // this.openChatUser.subscribe((user) => console.log(this.openChatUser));
    // socketService.subscribe(TypeName.msgSend, this.onMsgSend);
  }

  private onMsgFromUser = (response: MessageHistoryResponse) => {
    if (response.payload.messages) this.messageHistory.notify(() => response.payload.messages);
  };

  // private onMsgSend = (response: SendingMessageResponse) => {
  //   const recipient = response.payload.message.from;
  //   if (recipient === this.openChatUser.getValue()) {
  //     requestMessageHistory(this.openChatUser.getValue());
  //   } else {
  //     this.unreadMessagesNumber.notify((prev) => {

  //       const newObj = { ...prev };
  //       if (recipient in prev) newObj[recipient] += 1;
  //       else newObj[recipient] = 1;

  //       return newObj;
  //     });
  //   }
  // };

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
