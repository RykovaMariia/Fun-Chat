import { TypeName } from 'Enums/type.name';
import { WSRequest } from 'Interfaces/ws-request';
import { EventEmitter, ListenerResponse } from './event-emitter';
import { sessionStorageService } from './storage-service';
import { Observable } from './observable';

export class SocketService extends EventEmitter {
  private socket: WebSocket | null = null;

  private isOpenConnectingModal = new Observable<boolean>(false);

  private messageQueue: object[] = [];

  constructor() {
    super();
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket('ws://localhost:4000');

    this.socket.onopen = () => {
      this.isOpenConnectingModal.notify(false);
      this.flushMessageQueue();
      const user = sessionStorageService.getData('user');
      if (user !== null) {
        const { login, password } = user;
        this.sendMessage({
          id: '',
          type: TypeName.login,
          payload: {
            user: {
              login,
              password,
            },
          },
        });
      }
    };
    this.socket.onmessage = (event: MessageEvent<string>) => {
      const data = JSON.parse(event.data) as ListenerResponse<TypeName>;
      this.dispatch(data.type, data);
    };

    this.socket.onclose = () => {
      if (!this.isOpenConnectingModal.getValue()) this.isOpenConnectingModal.notify(true);

      setTimeout(() => {
        this.connect();
      }, 1000);
    };

    this.socket.onerror = (event: Event) => {
      console.error('ws connection error', event);
    };
  }

  subscribeOpenConnectingModal(callback: (isOpen: boolean) => void) {
    this.isOpenConnectingModal.subscribe(callback, true);
  }

  sendMessage(message: WSRequest) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      this.messageQueue.push(message);
    }
  }

  flushMessageQueue() {
    while (this.messageQueue.length > 0 && this.socket?.readyState === WebSocket.OPEN) {
      const message = this.messageQueue.shift();
      this.socket.send(JSON.stringify(message));
    }
  }
}

export const socketService = new SocketService();
