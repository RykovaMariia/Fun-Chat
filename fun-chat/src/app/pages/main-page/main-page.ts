import './main-page.scss';
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

    const user = new BaseComponent({ tagName: 'div', classNames: 'header__user' });
    const userName = new BaseComponent({ tagName: 'div', classNames: 'user-name' });
    const logoutButton = new LogoutButton(this.router);
    loginService.subscribeLogin((log) => userName.setTextContent(log));

    user.appendChildren([userName, logoutButton]);

    const header = new Header();
    header.appendChild(user);

    const main = new Main(router);

    const footer = new Footer();
    this.appendChildren([header, main, footer]);
  }
}
