import { BaseResponse } from 'Interfaces/ws-message';
import { ResponseType } from 'Enums/response-type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ListenerResponse<T extends ResponseType> = BaseResponse<T, any>;
export type Listener<T extends ResponseType> = (response: ListenerResponse<T>) => void;
export type Listeners = { [T in ResponseType]: Listener<T>[] };

export class EventEmitter {
  protected listeners = {} as Listeners;

  private getCallbacksFor<T extends ResponseType>(eventName: ResponseType): Listener<T>[] {
    return (this.listeners[eventName] ?? []) as Listener<T>[];
  }

  private setCallbacksFor<T extends ResponseType>(eventName: T, listeners: Listener<T>[]): void {
    if (listeners.length === 0) {
      delete this.listeners[eventName];
    } else {
      this.listeners[eventName] = listeners as Listeners[T];
    }
  }

  subscribe<T extends ResponseType>(eventName: T, callback: Listener<T>) {
    const subs = this.getCallbacksFor<T>(eventName);
    subs.push(callback);
    this.setCallbacksFor(eventName, subs);
    return () => this.unsubscribe(eventName, callback);
  }

  unsubscribe<T extends ResponseType>(eventName: T, callback: Listener<T>) {
    const subs = this.getCallbacksFor(eventName).filter((item) => item !== callback);

    this.setCallbacksFor(eventName, subs);
  }

  dispatch<T extends ResponseType>(eventName: T, data: ListenerResponse<T>) {
    this.getCallbacksFor(eventName).forEach((callback) => callback(data));
  }
}
