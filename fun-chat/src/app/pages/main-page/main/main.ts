import './main.scss';
import { BaseComponent } from 'Components/base-component';
import { UserList } from './user-list/user-list';
import { Chat } from './chat/chat';

export class Main extends BaseComponent {
  constructor() {
    super({
      tagName: 'main',
      classNames: 'main',
    });

    let chat = new Chat();

    const userList = new UserList((str, isActive) => {
      chat.unsubscribeHistoryMessage();
      chat.destroy();
      chat = new Chat(str, isActive);
      this.appendChild(chat);
    });

    this.appendChildren([userList, chat]);
  }
}
