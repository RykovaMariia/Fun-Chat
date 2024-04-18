import { BaseComponent } from 'Components/base-component';
import { messageService } from 'Services/chat-services/message-service';
import { socketService } from 'Services/socket-service';

function requestMessageHistory(login: string) {
  socketService.sendMessage({
    id: '',
    type: 'MSG_FROM_USER',
    payload: {
      user: {
        login,
      },
    },
  });
}

export class MessageField extends BaseComponent {
  constructor(user?: string) {
    super({
      tagName: 'div',
      classNames: 'chat__messages',
    });

    if (!user) {
      this.setTextContent('Select the user to send the message to...');
    } else {
      requestMessageHistory(user);

      messageService.subscribeHistoryMessage((messages) => {
        if (messages.length === 0) this.setTextContent('Write your first message...');
        else {
          const message = messages.map(
            (msg) => new BaseComponent({ tagName: 'div', textContent: msg.text }),
          );
          this.appendChildren(message);
        }
      });
    }
  }
}
