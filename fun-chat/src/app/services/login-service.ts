import { UserLoginResponse } from 'Interfaces/ws-message';
import { ResponseType } from 'Enums/response-type';
import { socketService } from './socket-service';
import { Observable } from './observables/observable';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Login {
  login: string;
  password: string;
}

export class LoginService {
  private user = new Observable<string>('');

  constructor() {
    socketService.subscribe(ResponseType.login, this.onUserLogin);
  }

  onUserLogin = (response: UserLoginResponse) => {
    this.user.notify(response.payload.user.login);
  };

  subscribeLogin() {
    // eslint-disable-next-line no-console
    this.user.subscribe((log) => console.log(log));
  }
}

export const loginService = new LoginService();
