import { BaseComponent } from 'Components/base-component';
import { Input } from 'Components/input/input';
import { userListService } from 'Services/chat-services/chat-service';

export class UserList extends BaseComponent {
  private activeUsers: BaseComponent[] = [];

  constructor() {
    super({
      tagName: 'section',
      classNames: 'user-list',
    });

    const search = new Input({ type: 'text', placeholder: 'search...' });
    const userList = new BaseComponent({ tagName: 'ul' });

    userListService.subscribeUserActive((userNames) => {
      this.activeUsers.forEach((user) => user.destroy());
      this.activeUsers = userNames.map(
        (userName) => new BaseComponent({ tagName: 'li', textContent: userName }),
      );
      userList.appendChildren([...this.activeUsers]);
    });

    this.appendChildren([search, userList]);
  }
}
