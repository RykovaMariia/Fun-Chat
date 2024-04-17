import { ResponseType } from 'Enums/response-type';
import { EventEmitter, ListenerResponse } from './event-emitter';
import { sessionStorageService } from './storage-service';

export class SocketService extends EventEmitter {
  private socket = new WebSocket('ws://localhost:4000');

  private messageQueue: object[] = [];

  constructor() {
    super();

    this.socket.onopen = (): void => {
      this.flushMessageQueue();
      const user = sessionStorageService.getData('user');
      if (user !== null) {
        const { login, password } = user;
        this.sendMessage({
          id: '',
          type: ResponseType.login,
          payload: {
            user: {
              login,
              password,
            },
          },
        });
      }
    };
    this.socket.onmessage = (event: MessageEvent<string>): void => {
      const data = JSON.parse(event.data) as ListenerResponse<ResponseType>;
      this.dispatch(data.type, data);
    };
    this.socket.onerror = (event: Event): void => {
      console.error('ws connection error', event);
    };
  }

  sendMessage(message: object) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      this.messageQueue.push(message);
    }
  }

  flushMessageQueue() {
    while (this.messageQueue.length > 0 && this.socket.readyState === WebSocket.OPEN) {
      const message = this.messageQueue.shift();
      this.socket.send(JSON.stringify(message));
    }
  }
}

export const socketService = new SocketService();
