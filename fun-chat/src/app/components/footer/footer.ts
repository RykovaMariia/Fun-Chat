import './footer.scss';
import { BaseComponent } from 'Components/base-component';
import { SvgContainer } from 'Components/svg-container/svg-container';

export class Footer extends BaseComponent {
  constructor() {
    super({
      tagName: 'footer',
      classNames: 'footer',
    });

    const logoRSSchool = new SvgContainer('logo-rsschool', { classNames: 'logo-rsschool' });

    const nameGitHub = new BaseComponent({
      tagName: 'a',
      classNames: 'gitHub',
      textContent: 'RykovaMariia',
      attribute: { name: 'href', value: 'https://github.com/RykovaMariia' },
    });

    const creationYear = new BaseComponent({
      tagName: 'div',
      classNames: 'year',
      textContent: '2024',
    });

    this.appendChildren([logoRSSchool, nameGitHub, creationYear]);
  }
}
