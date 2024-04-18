import { BaseComponent } from 'Components/base-component';
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

  constructor(user?: string) {
    super({
      tagName: 'div',
      classNames: 'chat__messages',
    });

    if (!user) {
      this.setTextContent('Select the user to send the message to...');
    } else {
      requestMessageHistory(user);

      messageService.subscribeHistoryMessage(this.createMessage);
    }
  }

  createMessage = (messages: MessageResponse[]) => {
    this.messageElements.forEach((el) => el.destroy());

    if (messages.length === 0) {
      this.setTextContent('Write your first message...');
    } else {
      this.messageElements = messages.map(
        (msg) => new BaseComponent({ tagName: 'div', textContent: msg.text }),
      );
      this.appendChildren(this.messageElements);
    }
  };

  unsubscribeHistoryMessage() {
    messageService.unsubscribeHistoryMessage(this.createMessage);
  }
}
