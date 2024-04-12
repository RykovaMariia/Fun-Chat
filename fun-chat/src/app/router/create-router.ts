import { AppRoute } from 'Enums/app-route';

export function createRoutes() {
  return [
    {
      path: '',
      component: async () => {
        const { LoginPage } = await import('Pages/login-page/login-page');
        return new LoginPage();
      },
    },
    {
      path: AppRoute.Login,
      component: async () => {
        const { LoginPage } = await import('Pages/login-page/login-page');
        return new LoginPage();
      },
    },
    {
      path: AppRoute.Main,
      component: async () => {
        const { MainPage } = await import('Pages/main-page/main-page');
        return new MainPage();
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
