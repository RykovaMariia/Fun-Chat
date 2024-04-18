import { BaseComponent } from 'Components/base-component';
import { Footer } from 'Components/footer/footer';
import { Header } from 'Components/header/header';
import { IRouter } from 'Interfaces/router';
import { loginService } from 'Services/chat-services/login-service';
import { LogoutButton } from './logout-button/logout-button';
import { Main } from './main/main';

export class MainPage extends BaseComponent {
  constructor(private router: IRouter) {
    super({
      tagName: 'div',
      classNames: 'main-page',
    });

    const header = new Header(this.router);
    const userName = new BaseComponent({ tagName: 'div', classNames: 'user-name' });

    loginService.subscribeLogin((log) => userName.setTextContent(log));
    header.prependChild(userName);

    const logoutButton = new LogoutButton(this.router);
    header.appendChild(logoutButton);

    const main = new Main();

    const footer = new Footer();
    this.appendChildren([header, main, footer]);
  }
}
