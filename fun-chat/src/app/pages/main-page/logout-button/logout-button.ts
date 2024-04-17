import { Button } from 'Components/button/button';
import { AppRoute } from 'Enums/app-route';
import { IRouter } from 'Interfaces/router';
import { loginService } from 'Services/chat-services/login-service';
import { socketService } from 'Services/socket-service';
import { sessionStorageService } from 'Services/storage-service';

export class LogoutButton extends Button {
  constructor(private router: IRouter) {
    super({
      classNames: 'button_logout',
      textContent: 'logout',
    });

    this.setOnClick(() => {
      const user = sessionStorageService.getData('user');
      if (user !== null) {
        socketService.sendMessage({
          id: '',
          type: 'USER_LOGOUT',
          payload: {
            user: {
              login: user.login,
              password: user.password,
            },
          },
        });

        loginService.subscribeLogout(() => {
          sessionStorageService.removeData('user');
          this.router.navigate(AppRoute.Login);
        });
      }
    });
  }
}
