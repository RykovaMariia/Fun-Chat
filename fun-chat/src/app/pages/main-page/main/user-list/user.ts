import { BaseComponent } from 'Components/base-component';
import { UnreadMessagesNumber, messageService } from 'Services/chat-services/message-service';
import { requestMessageHistory } from 'Utils/request';

export class User extends BaseComponent {
  private unreadMsgCount: BaseComponent<HTMLElement>;

  private userName: string;

  constructor({ isActive, userName }: { isActive: boolean; userName: string }) {
    super({
      tagName: 'li',
      classNames: isActive ? 'activeUser' : 'inactiveUser',
      textContent: userName,
    });

    this.userName = userName;
    this.unreadMsgCount = new BaseComponent({ tagName: 'span', classNames: 'unread-msg-count' });

    requestMessageHistory(userName);

    messageService.subscribeUnreadMessagesNumber(this.setUnreadMessagesNumber);
  }

  setUnreadMessagesNumber = (unreadMessageCount: UnreadMessagesNumber) => {
    if (this.userName in unreadMessageCount) {
      this.unreadMsgCount.setTextContent(unreadMessageCount[this.userName].toString());
      this.appendChild(this.unreadMsgCount);
    } else {
      this.unreadMsgCount.destroy();
    }
  };

  destroyAndUnsubscribe() {
    this.destroy();
    messageService.unsubscribeUnreadMessagesNumber(this.setUnreadMessagesNumber);
  }
}
