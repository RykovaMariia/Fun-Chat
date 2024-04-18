import { BaseComponent } from 'Components/base-component';
import { Button } from 'Components/button/button';
import { Input } from 'Components/input/input';
import { TypeName } from 'Enums/type.name';
import { socketService } from 'Services/socket-service';

function sendMessage(user: string, text: string) {
  socketService.sendMessage({
    id: '',
    type: TypeName.msgSend,
    payload: {
      message: {
        to: user,
        text,
      },
    },
  });
}

export class SendMessageField extends BaseComponent {
  constructor(user?: string) {
    super({
      tagName: 'div',
      classNames: 'chat__send-message',
    });

    const inputText = new Input({ type: 'text', placeholder: 'message...', required: true });
    const sendMessageButton = new Button(
      { classNames: 'button_send-message' },
      {
        onclick: () => {
          if (user) {
            sendMessage(user, inputText.getValue());
          }
        },
      },
    );

    this.appendChildren([inputText, sendMessageButton]);
  }
}
