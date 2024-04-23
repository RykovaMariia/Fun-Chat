import { ErrorResponse, UserLoginResponse, UserLogoutResponse } from 'Interfaces/ws-response';
import { TypeName } from 'Enums/type.name';
import { requestActiveAndInactiveUsers } from 'Utils/requests';
import { socketService } from '../socket-service';
import { Observable } from '../observable';

type LoginError = 'a user with this login is already authorized' | 'incorrect password' | '';

export class LoginService {
  private user = new Observable<string>('');

  private loginError = new Observable<LoginError>('');

  constructor() {
    socketService.subscribe(TypeName.login, this.onUserLogin);
    socketService.subscribe(TypeName.logout, this.onUserLogout);
    socketService.subscribe(TypeName.error, this.getLoginError);
  }

  private onUserLogin = (response: UserLoginResponse) => {
    if (response.payload.user.isLogined) this.user.notify(response.payload.user.login);
    requestActiveAndInactiveUsers();
  };

  private onUserLogout = (response: UserLogoutResponse) => {
    if (!response.payload.user.isLogined || response.payload.user.login === this.user.getValue())
      this.user.notify('');
  };

  private getLoginError = (response: ErrorResponse) => {
    if (
      response.payload.error === 'a user with this login is already authorized' ||
      response.payload.error === 'incorrect password'
    ) {
      this.loginError.notify(response.payload.error);
    }
  };

  subscribeLogin(callback: (log: string) => void) {
    this.user.subscribe(callback, true);
  }

  subscribeLogout(callback: () => void) {
    this.user.subscribe(callback, true);
  }

  subscribeLoginError(callback: (error: LoginError) => void) {
    this.loginError.subscribe(callback);
  }

  getLogin() {
    return this.user.getValue();
  }
}

export const loginService = new LoginService();
