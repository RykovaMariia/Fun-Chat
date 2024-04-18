import { Input } from 'Components/input/input';
import './chat.scss';
import { BaseComponent } from 'Components/base-component';
import { Button } from 'Components/button/button';
import { ChatHeader } from './chat-header';
import { MessageField } from './message-field';

export class Chat extends BaseComponent {
  constructor(user?: string, isActive?: boolean) {
    super({
      tagName: 'section',
      classNames: 'chat',
    });

    const chatHeader = new ChatHeader(user, isActive);

    const messageField = new MessageField(user);

    const sendMessageField = new BaseComponent({
      tagName: 'div',
      classNames: 'chat__send-message',
    });

    const inputText = new Input({ type: 'text', placeholder: 'message...', required: true });
    const sendMessageButton = new Button({ classNames: 'button_send-message' });

    sendMessageField.appendChildren([inputText, sendMessageButton]);

    this.appendChildren([chatHeader, messageField, sendMessageField]);
  }
}
