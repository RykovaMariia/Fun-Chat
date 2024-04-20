import './modal.scss';
import { BaseComponent } from 'Components/base-component';
import { Button } from 'Components/button/button';

export class Modal extends BaseComponent {
  constructor(textContent: string) {
    super({
      tagName: 'div',
      classNames: 'modal',
    });

    const modalWindow = new BaseComponent({
      tagName: 'div',
      classNames: 'modal__window',
      textContent,
    });

    const okButton = new Button(
      {
        classNames: 'modal__button',
        textContent: 'ok',
      },
      { onclick: () => this.destroy() },
    );

    modalWindow.appendChild(okButton);

    this.appendChild(modalWindow);
  }
}
