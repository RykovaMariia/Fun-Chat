import { ContextMenu } from 'Components/context-menu/context-menu';
import './message.scss';
import { BaseComponent } from 'Components/base-component';
import { MessageResponse } from 'Interfaces/ws-response';
import { loginService } from 'Services/chat-services/login-service';
import { messageService } from 'Services/chat-services/message-service';

function translateDate(date: number) {
  const newDate = new Date(date);

  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
    .format(newDate)
    .replace('/', '.')
    .replace('/', '.');
}

function getMessageStatus(message: MessageResponse) {
  let status;
  if (message.status.isReaded) {
    status = 'readed';
  } else if (message.status.isDelivered) {
    status = 'delivered';
  } else {
    status = 'send';
  }
  return status;
}

export class Message extends BaseComponent {
  constructor(message: MessageResponse) {
    super({
      tagName: 'div',
      classNames: 'message',
    });

    const messageWrapper = new BaseComponent({ tagName: 'div', classNames: 'message__wrapper' });

    if (message.to !== loginService.getLogin()) {
      this.setClassName('message_right');
      messageWrapper.setClassName('message__wrapper_right');

      this.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const contextMenu = new ContextMenu(message);
        this.prependChild(contextMenu);
      });
    }

    const fromName = new BaseComponent({ tagName: 'div', textContent: message.from });
    const dateTime = new BaseComponent({
      tagName: 'div',
      textContent: translateDate(message.datetime),
    });
    const messageInfo = new BaseComponent({ tagName: 'div', classNames: 'message__info' });
    messageInfo.appendChildren([fromName, dateTime]);

    const messageText = new BaseComponent({
      tagName: 'div',
      classNames: 'message__text',
      textContent: message.text,
    });

    const statuses = new BaseComponent({ tagName: 'div', classNames: 'statuses' });
    const status = new BaseComponent({ tagName: 'div', classNames: 'status' });
    const edited = new BaseComponent({ tagName: 'div', classNames: 'edited' });
    if (message.from !== messageService.getOpenChatUser()) {
      status.setTextContent(getMessageStatus(message));
    }

    edited.setTextContent(message.status.isEdited ? 'edited' : '');

    statuses.appendChildren([edited, status]);
    messageWrapper.appendChildren([messageInfo, messageText, statuses]);

    this.appendChild(messageWrapper);
  }
}
