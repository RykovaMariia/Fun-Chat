import { BaseComponent } from 'Components/base-component';
import { Message } from 'Components/message/message';
import { TypeName } from 'Enums/type.name';
import { MessageResponse } from 'Interfaces/ws-response';
import { messageService } from 'Services/chat-services/message-service';
import { socketService } from 'Services/socket-service';

function requestMessageHistory(login: string) {
  socketService.sendMessage({
    id: '',
    type: TypeName.msgFromUser,
    payload: {
      user: {
        login,
      },
    },
  });
}

export class MessageField extends BaseComponent {
  private messageElements: BaseComponent<HTMLElement>[] = [];

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
    this.messageElements.forEach((el) => el.destroy());

    if (messages.length === 0) {
      this.setTextContent('Write your first message...');
    } else {
      this.messageElements = messages.map((msg) => new Message(msg, this.user || ''));
      this.appendChildren(this.messageElements);
    }
  };

  unsubscribeHistoryMessage() {
    messageService.unsubscribeHistoryMessage(this.createMessage);
  }
}
