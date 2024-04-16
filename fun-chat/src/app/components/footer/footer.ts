import './footer.scss';
import { BaseComponent } from 'Components/base-component';

export class Footer extends BaseComponent {
  constructor() {
    super({
      tagName: 'footer',
      classNames: 'footer',
    });

    const logoSchool = new BaseComponent({
      tagName: 'div',
      classNames: 'logoSchool',
      textContent: 'RSSchool',
    });

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

    this.appendChildren([logoSchool, nameGitHub, creationYear]);
  }
}
