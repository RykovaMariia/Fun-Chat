import { ResponseType } from 'Enums/response-type';
import {
  UsersActiveResponse,
  UserExternalLoginResponse,
  UsersInactiveResponse,
  UserExternalLogoutResponse,
} from 'Interfaces/ws-message';
import { Observable } from 'Services/observable';
import { socketService } from 'Services/socket-service';
import { loginService } from './login-service';

class UserListService {
  private activeUsers = new Observable<string[]>([]);

  private inactiveUsers = new Observable<string[]>([]);

  constructor() {
    socketService.subscribe(ResponseType.userActive, this.onUserActive);
    socketService.subscribe(ResponseType.userExternalLogin, this.onUserExternalLogin);
    socketService.subscribe(ResponseType.userInactive, this.onUserInactive);
    socketService.subscribe(ResponseType.userExternalLogout, this.onUserExternalLogout);

    socketService.sendMessage({
      id: '',
      type: ResponseType.userActive,
      payload: null,
    });

    socketService.sendMessage({
      id: '',
      type: ResponseType.userInactive,
      payload: null,
    });
  }

  private onUserActive = (response: UsersActiveResponse) => {
    this.activeUsers.notify(response.payload.users.map((user) => user.login));
    loginService.subscribeLogin((login) =>
      this.activeUsers.notify((prev) => prev.filter((user) => user !== login)),
    );
  };

  private onUserExternalLogin = (response: UserExternalLoginResponse) => {
    const { login } = response.payload.user;

    this.activeUsers.notify((prev) => {
      if (!prev.includes(login)) {
        prev.push(login);
      }
      return prev;
    });

    this.inactiveUsers.notify((prev) => {
      const indexLog = prev.indexOf(login);
      if (indexLog >= 0) {
        prev.splice(indexLog, 1);
      }
      return prev;
    });
  };

  subscribeUserActive(callback: (userName: string[]) => void) {
    this.activeUsers.subscribe(callback, true);
  }

  private onUserInactive = (response: UsersInactiveResponse) => {
    this.inactiveUsers.notify(response.payload.users.map((user) => user.login));
    loginService.subscribeLogin((login) =>
      this.inactiveUsers.notify((prev) => prev.filter((user) => user !== login)),
    );
  };

  private onUserExternalLogout = (response: UserExternalLogoutResponse) => {
    const { login } = response.payload.user;
    this.inactiveUsers.notify((prev) => {
      if (!prev.includes(login)) {
        prev.push(login);
      }
      return prev;
    });
    this.activeUsers.notify((prev) => {
      const indexLog = prev.indexOf(login);
      if (indexLog >= 0) {
        prev.splice(indexLog, 1);
      }
      return prev;
    });
  };

  subscribeUserInactive(callback: (userName: string[]) => void) {
    this.inactiveUsers.subscribe(callback, true);
  }
}

export const userListService = new UserListService();
