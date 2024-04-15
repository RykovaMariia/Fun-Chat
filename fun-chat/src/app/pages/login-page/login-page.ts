import './login-page.scss';
import { BaseComponent } from 'Components/base-component';
import { Footer } from 'Components/footer/footer';
import { Header } from 'Components/header/header';
import { LoginForm } from 'Components/login-form/login-form';
import { ResponseType } from 'Enums/response-type';
import { IRouter } from 'Interfaces/router';
import { loginService } from 'Services/login-service';
import { socketService } from 'Services/socket-service';

export class LoginPage extends BaseComponent {
  constructor(router: IRouter) {
    super({
      tagName: 'div',
      classNames: 'login-page',
    });

    const header = new Header(router);
    const heading = new BaseComponent({
      tagName: 'h2',
      classNames: 'login__heading',
      textContent: 'LOGIN',
    });
    const loginForm = new LoginForm((e, login, password) => {
      e.preventDefault();
      socketService.sendMessage({
        id: '',
        type: ResponseType.login,
        payload: {
          user: {
            login,
            password,
          },
        },
      });
    });
    const footer = new Footer();

    loginService.subscribeLogin();
    this.insertChildren([header, heading, loginForm, footer]);
  }
}
