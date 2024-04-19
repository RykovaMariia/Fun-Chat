import './logout-button.scss';
import { Button } from 'Components/button/button';
import { SvgContainer } from 'Components/svg-container/svg-container';
import { AppRoute } from 'Enums/app-route';
import { TypeName } from 'Enums/type.name';
import { IRouter } from 'Interfaces/router';
import { loginService } from 'Services/chat-services/login-service';
import { socketService } from 'Services/socket-service';
import { sessionStorageService } from 'Services/storage-service';

export class LogoutButton extends Button {
  constructor(private router: IRouter) {
    super({
      classNames: 'button_logout',
    });

    const logoutSvg = new SvgContainer('logout', { classNames: 'logout-svg' });

    this.setOnClick(() => {
      const user = sessionStorageService.getData('user');
      if (user !== null) {
        socketService.sendMessage({
          id: '',
          type: TypeName.logout,
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

    this.appendChild(logoutSvg);
  }
}
