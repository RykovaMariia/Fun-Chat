import { AppRoute } from 'Enums/app-route';
import { pageService } from 'Services/page-service';

async function getPageByAuthenticatedStatus() {
  if (pageService.getAuthenticatedStatus()) {
    const { MainPage } = await import('Pages/main-page/main-page');
    return new MainPage();
  }
  const { LoginPage } = await import('Pages/login-page/login-page');
  return new LoginPage();
}

export function createRoutes() {
  return [
    {
      path: '',
      component: async () => {
        return getPageByAuthenticatedStatus();
      },
    },
    {
      path: AppRoute.Login,
      component: async () => {
        return getPageByAuthenticatedStatus();
      },
    },
    {
      path: AppRoute.Main,
      component: async () => {
        return getPageByAuthenticatedStatus();
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
