import { BaseComponent } from 'Components/base-component';
import { loginService } from 'Services/chat-services/login-service';

export class MainPage extends BaseComponent {
  constructor() {
    super({
      tagName: 'div',
      classNames: 'main-page',
    });

    loginService.subscribeLogin((log) => this.setTextContent(log));
  }
}
