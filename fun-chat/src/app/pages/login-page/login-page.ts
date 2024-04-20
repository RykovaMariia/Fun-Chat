import './login-page.scss';
import { BaseComponent } from 'Components/base-component';
import { Footer } from 'Components/footer/footer';
import { Header } from 'Components/header/header';
import { Link } from 'Components/link/link';
import { LoginForm } from 'Components/login-form/login-form';
import { Modal } from 'Components/modal/modal';
import { AppRoute } from 'Enums/app-route';
import { TypeName } from 'Enums/type.name';
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

    const header = new Header();
    const heading = new BaseComponent({
      tagName: 'h2',
      classNames: 'login__heading',
      textContent: 'LOGIN',
    });

    const aboutFunChat = new Link(
      { tagName: 'div', classNames: 'about-chat', textContent: 'about Fun Chat' },
      { toNavigation: AppRoute.About, router },
    );

    this.loginForm = this.loginForm.bind(this);
    const loginForm = new LoginForm(this.loginForm);
    loginForm.appendChild(aboutFunChat);

    const footer = new Footer();

    this.appendChildren([header, heading, loginForm, footer]);

    loginService.subscribeLoginError((errorText) => {
      this.appendChild(new Modal(errorText));
    });
  }

  loginForm(login: string, password: string) {
    socketService.sendMessage({
      id: '',
      type: TypeName.login,
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
