import './chat.scss';
import { BaseComponent } from 'Components/base-component';
import { UserList } from './user-list/user-list';

export class Chat extends BaseComponent {
  constructor() {
    super({
      tagName: 'main',
      classNames: 'chat',
    });

    const userList = new UserList();

    this.appendChildren([userList]);
  }
}
