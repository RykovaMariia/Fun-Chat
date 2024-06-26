import { BaseComponent } from 'Components/base-component';
import { Button } from 'Components/button/button';
import { Input } from 'Components/input/input';
import { TypeName } from 'Enums/type.name';
import { messageService } from 'Services/chat-services/message-service';
import { socketService } from 'Services/socket-service';
import { requestEditMessage } from 'Utils/requests';

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

export class SendMessageForm extends BaseComponent {
  constructor(user: string) {
    super({
      tagName: 'form',
      classNames: 'chat__send-message',
    });

    const inputText = new Input({ type: 'text', placeholder: 'message...', required: true });

    const sendMessageButton = new Button(
      { classNames: 'button_send-message', textContent: 'send' },
      {
        type: 'submit',
        onclick: (e) => {
          e.preventDefault();

          const editMessage = messageService.getEditText();
          const editId = Object.keys(editMessage)[0];

          if (inputText.getValue().length > 0 && !editId) {
            sendMessage(user, inputText.getValue());
            messageService.readMessages();
          }
          if (messageService.getEditText()) {
            requestEditMessage(editId, inputText.getValue());
            messageService.changeEditText({});
          }
          inputText.setValue('');
        },
      },
    );

    messageService.subscribeEditState((editText) => {
      if (Object.values(editText).length) {
        inputText.setValue(Object.values(editText)[0]);
      }
    });

    this.appendChildren([inputText, sendMessageButton]);
  }
}
