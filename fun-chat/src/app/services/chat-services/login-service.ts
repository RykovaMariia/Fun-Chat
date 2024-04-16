import { UserLoginResponse } from 'Interfaces/ws-message';
import { ResponseType } from 'Enums/response-type';
import { socketService } from '../socket-service';
import { Observable } from '../observable';

export class LoginService {
  private user = new Observable<string>('');

  constructor() {
    socketService.subscribe(ResponseType.login, this.onUserLogin);
  }

  onUserLogin = (response: UserLoginResponse) => {
    this.user.notify(response.payload.user.login);
  };

  subscribeLogin(callback: (log: string) => void) {
    this.user.subscribe(callback, true);
  }

  getLogin() {
    return this.user.getValue();
  }
}

export const loginService = new LoginService();
