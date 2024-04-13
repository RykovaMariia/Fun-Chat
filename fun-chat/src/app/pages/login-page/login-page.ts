import './login-page.scss';
import { BaseComponent } from 'Components/base-component';
import { Footer } from 'Components/footer/footer';
import { Header } from 'Components/header/header';
import { LoginForm } from 'Components/login-form/login-form';
import { IRouter } from 'Interfaces/router';

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
    const loginForm = new LoginForm();
    const footer = new Footer();

    this.insertChildren([header, heading, loginForm, footer]);
  }
}
