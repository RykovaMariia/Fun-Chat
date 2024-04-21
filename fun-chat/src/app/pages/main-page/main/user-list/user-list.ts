import './user-list.scss';
import { BaseComponent } from 'Components/base-component';
import { Input } from 'Components/input/input';
import { Link } from 'Components/link/link';
import { AppRoute } from 'Enums/app-route';
import { IRouter } from 'Interfaces/router';
import { userListService } from 'Services/chat-services/user-list-service';
import { User } from './user';

export class UserList extends BaseComponent {
  private activeUsers: User[] = [];

  private inactiveUsers: User[] = [];

  private userActiveList = new BaseComponent({ tagName: 'ul' });

  private userInactiveList = new BaseComponent({ tagName: 'ul' });

  // eslint-disable-next-line max-lines-per-function
  constructor(onClickUser: (user: string, isActive: boolean) => void, router: IRouter) {
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
      this.activeUsers = userNames.map((userName) => new User({ isActive: true, userName }));

      this.activeUsers.forEach((user, i) =>
        user.addEventListener('click', () => {
          user.unsubscribeUnreadMessagesNumber();
          onClickUser(userNames[i] || '', true);
        }),
      );

      this.userActiveList.appendChildren(this.activeUsers);
    });

    userListService.subscribeUserInactive((userNames) => {
      search.setValue('');
      this.inactiveUsers.forEach((user) => user.destroy());
      this.inactiveUsers = userNames.map((userName) => new User({ isActive: false, userName }));

      this.inactiveUsers.forEach((user, i) =>
        user.addEventListener('click', () => {
          user.unsubscribeUnreadMessagesNumber();
          onClickUser(userNames[i] || '', false);
        }),
      );

      this.userInactiveList.appendChildren(this.inactiveUsers);
    });

    const userAllList = new BaseComponent({ tagName: 'div', classNames: 'userList' });
    userAllList.appendChildren([this.userActiveList, this.userInactiveList]);

    const aboutFunChat = new Link(
      { tagName: 'div', classNames: 'about-chat', textContent: 'about Fun Chat' },
      { toNavigation: AppRoute.About, router },
    );

    this.appendChildren([search, userAllList, aboutFunChat]);
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
