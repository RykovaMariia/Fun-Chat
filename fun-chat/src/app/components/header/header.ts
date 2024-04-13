import './header.scss';
import { BaseComponent } from 'Components/base-component';
import { Link } from 'Components/link/link';
import { AppRoute } from 'Enums/app-route';
import { IRouter } from 'Interfaces/router';

export class Header extends BaseComponent {
  constructor(router: IRouter) {
    super({
      tagName: 'header',
      classNames: 'header',
    });

    const logo = new BaseComponent({
      tagName: 'h1',
      classNames: 'header__logo',
      textContent: 'Fun Chat',
    });

    const about = new Link(
      { tagName: 'div', classNames: 'about', textContent: 'about' },
      { toNavigation: AppRoute.About, router },
    );

    this.insertChildren([logo, about]);
  }
}
