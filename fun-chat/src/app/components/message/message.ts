import './message.scss';
import { BaseComponent } from 'Components/base-component';
import { MessageResponse } from 'Interfaces/ws-response';
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

    if (message.from !== messageService.getOpenChatUser()) {
      this.setClassName('message_left');
      messageWrapper.setClassName('message__wrapper_left');
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

    if (message.from !== messageService.getOpenChatUser()) {
      const edited = new BaseComponent({ tagName: 'div', classNames: 'edited' });

      const status = new BaseComponent({ tagName: 'div', classNames: 'status' });

      status.setTextContent(getMessageStatus(message));

      statuses.appendChildren([status, edited]);
    }
    messageWrapper.appendChildren([messageInfo, messageText, statuses]);

    this.appendChild(messageWrapper);
  }
}
