import './link.scss';
import { BaseComponent, BaseComponentProps } from 'Components/base-component';
import { AppRoute } from 'Enums/app-route';
import { IRouter } from 'Interfaces/router';

export class Link extends BaseComponent {
  constructor(
    props: BaseComponentProps,
    {
      toNavigation,
      router,
      reference,
    }: { toNavigation?: AppRoute; router?: IRouter; reference?: string },
  ) {
    super(props);
    if (toNavigation && router) {
      this.navigate(toNavigation, router);
    }
    if (reference) {
      this.setAttribute({ name: 'href', value: reference });
    }

    this.setClassName('link');
  }

  navigate(toNavigation: AppRoute, router: IRouter) {
    this.element.addEventListener('click', () => {
      router.navigate(toNavigation);
    });
  }
}
