import { Button } from 'Components/button/button';
import './about-page.scss';
import { BaseComponent } from 'Components/base-component';
import { AppRoute } from 'Enums/app-route';
import { IRouter } from 'Interfaces/router';
import { sessionStorageService } from 'Services/storage-service';
import { requestActiveAndInactiveUsers } from 'Utils/requests';
import { Link } from 'Components/link/link';

export const GITHUB_LINK = 'https://github.com/RykovaMariia';

export class AboutPage extends BaseComponent {
  constructor(router: IRouter) {
    super({
      tagName: 'div',
      classNames: 'about-page',
    });

    const about = new BaseComponent({ tagName: 'div', classNames: 'about' });

    const heading = new BaseComponent({
      tagName: 'h1',
      classNames: 'about__heading',
      textContent: ' Fun Chat',
    });

    const textContent = new BaseComponent({
      tagName: 'div',
      classNames: 'about__text',
      textContent:
        'The application is designed to demonstrate the Fun Chat task as part of the RSSchool JS/FE 2024',
    });

    const nameGitHub = new Link(
      { tagName: 'a', textContent: 'RykovaMariia', classNames: 'gitHub' },
      { reference: GITHUB_LINK },
    );

    const button = new Button(
      { classNames: 'button_about', textContent: 'Go back' },
      {
        onclick: () => {
          router.navigate(AppRoute.Main);
          if (sessionStorageService.getData('user') !== null) {
            requestActiveAndInactiveUsers();
          }
        },
      },
    );
    about.appendChildren([heading, textContent, nameGitHub, button]);
    this.appendChild(about);
  }
}
