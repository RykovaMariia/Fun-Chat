import './link.scss';
import { BaseComponent, BaseComponentProps } from 'Components/base-component';
import { AppRoute } from 'Enums/app-route';
import { IRouter } from 'Interfaces/router';

export class Link extends BaseComponent {
  constructor(
    props: BaseComponentProps,
    { toNavigation, router }: { toNavigation: AppRoute; router: IRouter },
  ) {
    super(props);
    this.navigate(toNavigation, router);
    this.setClassName('link');
  }

  navigate(toNavigation: AppRoute, router: IRouter) {
    this.element.addEventListener('click', () => {
      router.navigate(toNavigation);
    });
  }
}
