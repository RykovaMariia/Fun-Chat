import { BaseComponent } from 'Components/base-component';

export class ChatHeader extends BaseComponent {
  constructor(user?: string, isActive?: boolean) {
    super({
      tagName: 'div',
      classNames: 'chat__header',
    });

    const userName = new BaseComponent({ tagName: 'div', textContent: user || '' });

    const userStatus = new BaseComponent({ tagName: 'div' });

    if (user) {
      userStatus.setClassName(isActive ? ['user-status_active', 'user-status'] : 'user-status');
      userStatus.setTextContent(isActive ? 'active' : 'inactive');
    }
    this.appendChildren([userName, userStatus]);
  }
}
