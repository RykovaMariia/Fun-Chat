import './modal.scss';
import { BaseComponent } from 'Components/base-component';
import { Button } from 'Components/button/button';

interface ModalProps {
  textContent: string;
  description?: BaseComponent;
  buttonText?: string;
}

export class Modal extends BaseComponent {
  constructor({ textContent, description, buttonText }: ModalProps) {
    super({
      tagName: 'div',
      classNames: 'modal',
    });

    const modalWindow = new BaseComponent({
      tagName: 'div',
      classNames: 'modal__window',
      textContent,
    });

    if (description) {
      modalWindow.appendChild(description);
    }

    if (buttonText) {
      const okButton = new Button(
        {
          classNames: 'modal__button',
          textContent: buttonText,
        },
        { onclick: () => this.destroy() },
      );

      modalWindow.appendChild(okButton);
    }

    this.appendChild(modalWindow);
  }
}
