import './chat.scss';
import { BaseComponent } from 'Components/base-component';
import { ChatHeader } from './chat-header';
import { MessageField } from './message-field';
import { SendMessageForm } from './send-message-form';

export class Chat extends BaseComponent {
  private messageField: MessageField;

  constructor(user?: string, isActive?: boolean) {
    super({
      tagName: 'section',
      classNames: 'chat',
    });

    const chatHeader = new ChatHeader(user, isActive);

    this.messageField = new MessageField(user);

    this.appendChildren([chatHeader, this.messageField]);

    if (user) {
      const sendMessageForm = new SendMessageForm(user);
      this.appendChild(sendMessageForm);
    }
  }

  unsubscribeHistoryMessage() {
    this.messageField.unsubscribeHistoryMessage();
  }
}
