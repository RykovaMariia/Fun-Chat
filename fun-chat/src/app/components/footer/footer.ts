import './footer.scss';
import { BaseComponent } from 'Components/base-component';
import { Link } from 'Components/link/link';
import { SvgContainer } from 'Components/svg-container/svg-container';
import { GITHUB_LINK } from 'Pages/about-page/about-page';

export class Footer extends BaseComponent {
  constructor() {
    super({
      tagName: 'footer',
      classNames: 'footer',
    });

    const logoRSSchool = new SvgContainer('logo-rsschool', { classNames: 'logo-rsschool' });

    const nameGitHub = new Link(
      { tagName: 'a', textContent: 'RykovaMariia', classNames: 'gitHub' },
      { reference: GITHUB_LINK },
    );

    const creationYear = new BaseComponent({
      tagName: 'div',
      classNames: 'year',
      textContent: '2024',
    });

    this.appendChildren([logoRSSchool, nameGitHub, creationYear]);
  }
}
