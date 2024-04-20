import { BaseComponent } from 'Components/base-component';
import { Message } from 'Components/message/message';

import { MessageResponse } from 'Interfaces/ws-response';
import { messageService } from 'Services/chat-services/message-service';
import { requestMessageHistory } from 'Utils/request';

export class MessageField extends BaseComponent {
  private readMessageElements: BaseComponent<HTMLElement>[] = [];

  private unreadMessageElements: BaseComponent<HTMLElement>[] = [];

  constructor(private user?: string) {
    super({
      tagName: 'div',
      classNames: 'chat__messages',
    });

    if (!this.user) {
      this.setTextContent('Select the user to send the message to...');
    } else {
      requestMessageHistory(this.user);

      messageService.subscribeHistoryMessage(this.createMessage);
    }
  }

  createMessage = (messages: MessageResponse[]) => {
    [...this.readMessageElements, ...this.unreadMessageElements].forEach((el) => el.destroy());

    if (messages.length === 0) {
      this.setTextContent('Write your first message...');
    } else {
      this.readMessageElements = messages
        .filter((msg) => msg.status.isReaded || msg.to === messageService.getOpenChatUser())
        .map((msg) => new Message(msg));

      const line = new BaseComponent({
        tagName: 'div',
        classNames: 'message__line',
        textContent: 'new messages',
      });
      line.scrollIntoView();

      this.unreadMessageElements = messages
        .filter((msg) => !msg.status.isReaded)
        .map((msg) => new Message(msg));

      this.appendChildren([...this.readMessageElements, line, ...this.unreadMessageElements]);
    }
  };

  unsubscribeHistoryMessage() {
    messageService.unsubscribeHistoryMessage(this.createMessage);
  }
}
