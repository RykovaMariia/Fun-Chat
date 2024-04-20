import './user-list.scss';
import { BaseComponent } from 'Components/base-component';
import { Input } from 'Components/input/input';
import { userListService } from 'Services/chat-services/user-list-service';

export class UserList extends BaseComponent {
  private activeUsers: BaseComponent[] = [];

  private inactiveUsers: BaseComponent[] = [];

  private userActiveList = new BaseComponent({ tagName: 'ul' });

  private userInactiveList = new BaseComponent({ tagName: 'ul' });

  constructor(onClickUser: (user: string, isActive: boolean) => void) {
    super({
      tagName: 'section',
      classNames: 'user-list',
    });

    const search = new Input({
      type: 'text',
      placeholder: 'search...',
      onInput: this.searchUserName,
    });

    userListService.subscribeUserActive((userNames) => {
      search.setValue('');
      this.activeUsers.forEach((user) => user.destroy());
      this.activeUsers = userNames.map(
        (userName) =>
          new BaseComponent({ tagName: 'li', classNames: 'activeUser', textContent: userName }),
      );

      this.activeUsers.forEach((user) =>
        user.addEventListener('click', () => {
          onClickUser(user.getTextContent() || '', true);
        }),
      );

      this.userActiveList.appendChildren(this.activeUsers);
    });

    userListService.subscribeUserInactive((userNames) => {
      search.setValue('');
      this.inactiveUsers.forEach((user) => user.destroy());
      this.inactiveUsers = userNames.map(
        (userName) =>
          new BaseComponent({ tagName: 'li', classNames: 'inactiveUser', textContent: userName }),
      );
      this.inactiveUsers.forEach((user) =>
        user.addEventListener('click', () => {
          onClickUser(user.getTextContent() || '', false);
        }),
      );

      this.userInactiveList.appendChildren(this.inactiveUsers);
    });

    this.appendChildren([search, this.userActiveList, this.userInactiveList]);
  }

  private searchUserName = (value: string) => {
    this.activeUsers.forEach((user) => user.destroy());
    const wantedActiveUsers = this.activeUsers.filter((user) =>
      user.getTextContent()?.toLowerCase().includes(value.toLowerCase()),
    );
    this.inactiveUsers.forEach((user) => user.destroy());
    const wantedInactiveUsers = this.inactiveUsers.filter((user) =>
      user.getTextContent()?.toLowerCase().includes(value.toLowerCase()),
    );
    this.userInactiveList.appendChildren(wantedActiveUsers);
    this.userInactiveList.appendChildren(wantedInactiveUsers);
  };
}
