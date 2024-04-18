import { UserLoginResponse, UserLogoutResponse } from 'Interfaces/ws-response';
import { TypeName } from 'Enums/type.name';
import { socketService } from '../socket-service';
import { Observable } from '../observable';

export class LoginService {
  private user = new Observable<string>('');

  constructor() {
    socketService.subscribe(TypeName.login, this.onUserLogin);
    socketService.subscribe(TypeName.logout, this.onUserLogout);
  }

  private onUserLogin = (response: UserLoginResponse) => {
    if (response.payload.user.isLogined) this.user.notify(response.payload.user.login);
  };

  private onUserLogout = (response: UserLogoutResponse) => {
    if (!response.payload.user.isLogined || response.payload.user.login === this.user.getValue())
      this.user.notify('');
  };

  subscribeLogin(callback: (log: string) => void) {
    this.user.subscribe(callback, true);
  }

  subscribeLogout(callback: () => void) {
    this.user.subscribe(callback, true);
  }
}

export const loginService = new LoginService();
