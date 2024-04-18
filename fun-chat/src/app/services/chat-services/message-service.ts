import { Message, MessageHistoryResponse } from 'Interfaces/ws-message';
import { ResponseType } from 'Enums/response-type';
import { socketService } from '../socket-service';
import { Observable } from '../observable';

export class MessageService {
  private messageHistory = new Observable<Message[]>([]);

  constructor() {
    socketService.subscribe(ResponseType.msgFromUser, this.onMsgFromUser);
  }

  private onMsgFromUser = (response: MessageHistoryResponse) => {
    if (response.payload.messages) this.messageHistory.notify(response.payload.messages);
  };

  subscribeHistoryMessage(callback: (messages: Message[]) => void) {
    this.messageHistory.subscribe(callback, true);
  }
}

export const messageService = new MessageService();
