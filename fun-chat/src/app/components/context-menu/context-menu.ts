import './context-menu.scss';
import { requestDeleteMessage } from 'Utils/requests';
import { BaseComponent } from 'Components/base-component';
import { messageService } from 'Services/chat-services/message-service';
import { MessageResponse } from 'Interfaces/ws-response';

export class ContextMenu extends BaseComponent {
  constructor(message: MessageResponse) {
    super({
      tagName: 'div',
      classNames: 'context-menu',
    });

    const deleteMessage = new BaseComponent({
      tagName: 'div',
      classNames: 'context-menu__button',
      textContent: 'delete',
    });

    deleteMessage.addEventListener('click', () => {
      requestDeleteMessage(message.id);
    });

    const editMessage = new BaseComponent({
      tagName: 'div',
      classNames: 'context-menu__button',
      textContent: 'edit',
    });

    editMessage.addEventListener('click', () => {
      messageService.changeEditText({ [message.id]: message.text });
    });

    this.appendChildren([deleteMessage, editMessage]);
  }
}
