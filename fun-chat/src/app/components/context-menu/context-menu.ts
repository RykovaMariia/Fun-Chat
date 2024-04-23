import './context-menu.scss';
import { requestDeleteMessage } from 'Utils/request';
import { BaseComponent } from 'Components/base-component';

export class ContextMenu extends BaseComponent {
  constructor(messageId: string) {
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
      requestDeleteMessage(messageId);
    });

    const editMessage = new BaseComponent({
      tagName: 'div',
      classNames: 'context-menu__button',
      textContent: 'edit',
    });

    this.appendChildren([deleteMessage, editMessage]);
  }
}
