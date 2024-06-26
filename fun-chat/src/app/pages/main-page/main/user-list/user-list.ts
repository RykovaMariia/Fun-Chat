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

  private userList = new BaseComponent({ tagName: 'ul' });

  // eslint-disable-next-line max-lines-per-function
  constructor(onClickUser: (user: string, isActive: boolean) => void, router: IRouter) {
    super({ tagName: 'section', classNames: 'user-list' });

    const search = new Input({
      type: 'text',
      placeholder: 'search...',
      onInput: this.searchUserName,
    });

    userListService.subscribeUserActive((userNames) => {
      search.setValue('');
      this.activeUsers.forEach((user) => user.destroyAndUnsubscribe());

      this.activeUsers = userNames.map(
        (userName, i) =>
          new User({
            isActive: true,
            userName,
            onClickUser: () => onClickUser(userNames[i] || '', true),
          }),
      );

      this.userList.prependChildren(this.activeUsers);
    });

    userListService.subscribeUserInactive((userNames) => {
      search.setValue('');
      this.inactiveUsers.forEach((user) => user.destroyAndUnsubscribe());

      this.inactiveUsers = userNames.map(
        (userName, i) =>
          new User({
            isActive: false,
            userName,
            onClickUser: () => onClickUser(userNames[i] || '', false),
          }),
      );

      this.userList.appendChildren(this.inactiveUsers);
    });

    const userAllList = new BaseComponent({ tagName: 'div', classNames: 'userList' });
    userAllList.appendChildren([this.userList]);

    const aboutFunChat = new Link(
      { tagName: 'div', classNames: 'about-chat', textContent: 'about Fun Chat' },
      { toNavigation: AppRoute.About, router },
    );

    this.appendChildren([search, userAllList, aboutFunChat]);
  }

  private searchUserName = (value: string) => {
    [...this.activeUsers, ...this.inactiveUsers].forEach((user) => user.destroy());
    const wantedActiveUsers = [...this.activeUsers, ...this.inactiveUsers].filter((user) =>
      user.getTextContent()?.toLowerCase().includes(value.toLowerCase()),
    );
    this.userList.appendChildren(wantedActiveUsers);
  };
}
