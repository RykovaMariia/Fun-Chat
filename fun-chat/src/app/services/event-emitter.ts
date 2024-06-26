import { TypeName } from 'Enums/type.name';
import { BaseResponseRequest } from 'Interfaces/base-ws';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ListenerResponse<T extends TypeName> = BaseResponseRequest<T, any>;
export type Listener<T extends TypeName> = (response: ListenerResponse<T>) => void;
export type Listeners = { [T in TypeName]: Listener<T>[] };

export class EventEmitter {
  protected listeners = {} as Listeners;

  private getCallbacksFor<T extends TypeName>(eventName: TypeName): Listener<T>[] {
    return (this.listeners[eventName] ?? []) as Listener<T>[];
  }

  private setCallbacksFor<T extends TypeName>(eventName: T, listeners: Listener<T>[]): void {
    if (listeners.length === 0) {
      delete this.listeners[eventName];
    } else {
      this.listeners[eventName] = listeners as Listeners[T];
    }
  }

  subscribe<T extends TypeName>(eventName: T, callback: Listener<T>) {
    const subs = this.getCallbacksFor<T>(eventName);
    subs.push(callback);
    this.setCallbacksFor(eventName, subs);
    return () => this.unsubscribe(eventName, callback);
  }

  unsubscribe<T extends TypeName>(eventName: T, callback: Listener<T>) {
    const subs = this.getCallbacksFor(eventName).filter((item) => item !== callback);

    this.setCallbacksFor(eventName, subs);
  }

  dispatch<T extends TypeName>(eventName: T, data: ListenerResponse<T>) {
    this.getCallbacksFor(eventName).forEach((callback) => callback(data));
  }
}
