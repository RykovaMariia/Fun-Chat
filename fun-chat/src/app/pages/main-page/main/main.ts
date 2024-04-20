import './main.scss';
import { BaseComponent } from 'Components/base-component';
import { messageService } from 'Services/chat-services/message-service';
import { IRouter } from 'Interfaces/router';
import { UserList } from './user-list/user-list';
import { Chat } from './chat/chat';

export class Main extends BaseComponent {
  constructor(router: IRouter) {
    super({
      tagName: 'main',
      classNames: 'main',
    });

    let chat = new Chat();

    const userList = new UserList((user, isActive) => {
      chat.unsubscribeHistoryMessage();
      chat.destroy();
      chat = new Chat(user, isActive);
      this.appendChild(chat);

      messageService.notifyOpenChatUser(user);
    }, router);

    this.appendChildren([userList, chat]);
  }
}
