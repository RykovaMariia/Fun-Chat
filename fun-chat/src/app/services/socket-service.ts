import { ResponseType } from 'Enums/response-type';
import { EventEmitter, ListenerResponse } from './event-emitter';

export class SocketService extends EventEmitter {
  private socket = new WebSocket('ws://localhost:4000');

  constructor() {
    super();

    this.socket.onopen = (): void => {};
    this.socket.onmessage = (event: MessageEvent<string>): void => {
      const data = JSON.parse(event.data) as ListenerResponse<ResponseType>;
      this.dispatch(data.type, data);
    };
    this.socket.onerror = (event: Event): void => {
      console.error('ws connection error', event);
    };
  }

  sendMessage(message: object) {
    this.socket.send(JSON.stringify(message));
  }
}

export const socketService = new SocketService();
