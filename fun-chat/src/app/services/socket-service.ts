import { ResponseType } from 'Enums/response-type';
import { EventEmitter, ListenerResponse } from './event-emitter';
import { sessionStorageService } from './storage-service';

export class SocketService extends EventEmitter {
  private socket = new WebSocket('ws://localhost:4000');

  constructor() {
    super();

    this.socket.onopen = (): void => {
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
      setTimeout(() => this.sendMessage(message), 1000);
    }
  }
}

export const socketService = new SocketService();
