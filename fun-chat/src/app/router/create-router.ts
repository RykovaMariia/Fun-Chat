import { AppRoute } from 'Enums/app-route';
import { IRouter } from 'Interfaces/router';
import { pageService } from 'Services/page-service';

async function getPageByAuthenticatedStatus(router: IRouter) {
  if (pageService.getAuthenticatedStatus()) {
    const { MainPage } = await import('Pages/main-page/main-page');
    return new MainPage();
  }
  const { LoginPage } = await import('Pages/login-page/login-page');
  return new LoginPage(router);
}

export function createRoutes(router: IRouter) {
  return [
    {
      path: '',
      component: async () => {
        return getPageByAuthenticatedStatus(router);
      },
    },
    {
      path: AppRoute.Login,
      component: async () => {
        return getPageByAuthenticatedStatus(router);
      },
    },
    {
      path: AppRoute.Main,
      component: async () => {
        return getPageByAuthenticatedStatus(router);
      },
    },
    {
      path: AppRoute.About,
      component: async () => {
        const { AboutPage } = await import('Pages/about-page/about-page');
        return new AboutPage();
      },
    },
  ];
}
