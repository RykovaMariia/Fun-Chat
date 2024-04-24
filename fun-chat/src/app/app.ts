import { BaseComponent } from 'Components/base-component';
import { Modal } from 'Components/modal/modal';
import { router } from 'Router/router';
import { socketService } from 'Services/socket-service';

export class App {
  constructor(private container: HTMLElement) {
    const modal = new Modal({
      textContent: 'connecting to the server',
      description: new BaseComponent({ tagName: 'span', classNames: 'loader' }),
    });
    socketService.subscribeOpenConnectingModal((isOpen) => {
      if (isOpen) {
        container.appendChild(modal.getElement());
      } else {
        modal.destroy();
      }
    });
  }

  start() {
    router.init(this.container);
  }
}
