import { BaseComponent } from 'Components/base-component';
import { userListService } from 'Services/chat-services/user-list-service';

export class ChatHeader extends BaseComponent {
  private userStatus = new BaseComponent({ tagName: 'div' });

  constructor(
    user?: string,
    private isActive?: boolean,
  ) {
    super({
      tagName: 'div',
      classNames: 'chat__header',
    });

    const userName = new BaseComponent({ tagName: 'div', textContent: user || '' });

    if (user) {
      this.userStatus.setClassName('user-status');
      this.changeUserStatus();

      userListService.subscribeUserActive((userNames) => {
        if (userNames.includes(user) && !this.isActive) {
          this.isActive = true;
          this.changeUserStatus();
        }
      });

      userListService.subscribeUserInactive((userNames) => {
        if (userNames.includes(user) && this.isActive) {
          this.isActive = false;
          this.changeUserStatus();
        }
      });
    }
    this.appendChildren([userName, this.userStatus]);
  }

  changeUserStatus() {
    this.userStatus.removeClassName('user-status_active');
    this.userStatus.removeClassName('user-status_inactive');
    this.userStatus.setClassName(this.isActive ? 'user-status_active' : 'user-status_inactive');
    this.userStatus.setTextContent(this.isActive ? 'active' : 'inactive');
  }
}
