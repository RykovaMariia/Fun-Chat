import './login-page.scss';
import { BaseComponent } from 'Components/base-component';
import { Footer } from 'Components/footer/footer';
import { Header } from 'Components/header/header';
import { LoginForm } from 'Components/login-form/login-form';
import { AppRoute } from 'Enums/app-route';
import { ResponseType } from 'Enums/response-type';
import { IRouter } from 'Interfaces/router';
import { loginService } from 'Services/chat-services/login-service';
import { socketService } from 'Services/socket-service';
import { sessionStorageService } from 'Services/storage-service';

export class LoginPage extends BaseComponent {
  constructor(private router: IRouter) {
    super({
      tagName: 'div',
      classNames: 'login-page',
    });

    const header = new Header(this.router);
    const heading = new BaseComponent({
      tagName: 'h2',
      classNames: 'login__heading',
      textContent: 'LOGIN',
    });
    this.loginForm = this.loginForm.bind(this);
    const loginForm = new LoginForm(this.loginForm);
    const footer = new Footer();

    this.appendChildren([header, heading, loginForm, footer]);
  }

  loginForm(login: string, password: string) {
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
    loginService.subscribeLogin((Login) => {
      if (Login) {
        sessionStorageService.saveData('user', { login, password });
        this.router.navigate(AppRoute.Main);
      }
    });
  }
}
