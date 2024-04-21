import { BaseComponent } from 'Components/base-component';
import { messageService } from 'Services/chat-services/message-service';

export class User extends BaseComponent {
  constructor({ isActive, userName }: { isActive: boolean; userName: string }) {
    super({
      tagName: 'li',
      classNames: isActive ? 'activeUser' : 'inactiveUser',
      textContent: userName,
    });

    const unreadMsgCount = new BaseComponent({ tagName: 'span', classNames: 'unread-msg-count' });

    messageService.subscribeUnreadMessagesNumber((unreadMessageCount) => {
      if (userName in unreadMessageCount) {
        unreadMsgCount.setTextContent(unreadMessageCount[userName].toString());
      }
    });

    this.appendChild(unreadMsgCount);
  }
}
