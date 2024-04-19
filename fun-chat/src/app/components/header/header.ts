import './header.scss';
import { BaseComponent } from 'Components/base-component';
import { SvgContainer } from 'Components/svg-container/svg-container';

export class Header extends BaseComponent {
  constructor() {
    super({
      tagName: 'header',
      classNames: 'header',
    });

    const logo = new BaseComponent({ tagName: 'div', classNames: 'logo' });

    const logoName = new BaseComponent({
      tagName: 'h1',
      classNames: 'logo__heading',
      textContent: 'FUN CHAT',
    });

    const logoSvg = new SvgContainer('logo', { classNames: 'logo__icon' });

    logo.appendChildren([logoName, logoSvg]);

    this.appendChild(logo);
  }
}
