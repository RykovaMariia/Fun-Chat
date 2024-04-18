import './chat.scss';
import { BaseComponent } from 'Components/base-component';
import { ChatHeader } from './chat-header';
import { MessageField } from './message-field';
import { SendMessageField } from './send-message-field';

export class Chat extends BaseComponent {
  private messageField: MessageField;

  constructor(user?: string, isActive?: boolean) {
    super({
      tagName: 'section',
      classNames: 'chat',
    });

    const chatHeader = new ChatHeader(user, isActive);

    this.messageField = new MessageField(user);

    const sendMessageField = new SendMessageField(user);

    this.appendChildren([chatHeader, this.messageField, sendMessageField]);
  }

  unsubscribeHistoryMessage() {
    this.messageField.unsubscribeHistoryMessage();
  }
}
