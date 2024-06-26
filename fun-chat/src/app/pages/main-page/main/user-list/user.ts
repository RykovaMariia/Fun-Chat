import { BaseComponent } from 'Components/base-component';
import { UnreadMessages, messageService } from 'Services/chat-services/message-service';
import { requestMessageHistory } from 'Utils/requests';

export class User extends BaseComponent {
  private unreadMsgCount: BaseComponent<HTMLElement>;

  private userName: string;

  constructor({
    isActive,
    userName,
    onClickUser,
  }: {
    isActive: boolean;
    userName: string;
    onClickUser: () => void;
  }) {
    super({
      tagName: 'li',
      classNames: isActive ? 'activeUser' : 'inactiveUser',
      textContent: userName,
    });

    this.addEventListener('click', onClickUser);

    this.userName = userName;
    this.unreadMsgCount = new BaseComponent({ tagName: 'span', classNames: 'unread-msg-count' });

    requestMessageHistory(userName, userName);

    messageService.subscribeUnreadMessages(this.setUnreadMessagesNumber);
  }

  setUnreadMessagesNumber = (unreadMessageCount: UnreadMessages) => {
    if (this.userName in unreadMessageCount && unreadMessageCount[this.userName].length) {
      this.unreadMsgCount.setTextContent(unreadMessageCount[this.userName].length.toString());
      this.appendChild(this.unreadMsgCount);
    } else {
      this.unreadMsgCount.destroy();
    }
  };

  destroyAndUnsubscribe() {
    this.destroy();
    this.unsubscribeUnreadMessagesNumber();
  }

  unsubscribeUnreadMessagesNumber() {
    messageService.unsubscribeUnreadMessages(this.setUnreadMessagesNumber);
  }
}
