import { MessageHistoryResponse, MessageResponse } from 'Interfaces/ws-response';
import { TypeName } from 'Enums/type.name';
import { socketService } from '../socket-service';
import { Observable } from '../observable';

export class MessageService {
  private messageHistory = new Observable<MessageResponse[]>([]);

  constructor() {
    socketService.subscribe(TypeName.msgFromUser, this.onMsgFromUser);
  }

  private onMsgFromUser = (response: MessageHistoryResponse) => {
    if (response.payload.messages) this.messageHistory.notify(() => response.payload.messages);
  };

  subscribeHistoryMessage(callback: (messages: MessageResponse[]) => void) {
    this.messageHistory.subscribe(callback);
  }

  unsubscribeHistoryMessage(callback: (messages: MessageResponse[]) => void) {
    this.messageHistory.unsubscribe(callback);
  }
}

export const messageService = new MessageService();
