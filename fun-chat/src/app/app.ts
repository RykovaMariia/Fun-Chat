import { router } from 'Router/router';

export class App {
  constructor(private container: HTMLElement) {}

  start() {
    router.init(this.container);
  }
}
