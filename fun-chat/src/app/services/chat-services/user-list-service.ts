import { TypeName } from 'Enums/type.name';
import {
  UsersActiveResponse,
  UserExternalLoginResponse,
  UsersInactiveResponse,
  UserExternalLogoutResponse,
} from 'Interfaces/ws-response';
import { Observable } from 'Services/observable';
import { socketService } from 'Services/socket-service';
import { loginService } from './login-service';

class UserListService {
  private activeUsers = new Observable<string[]>([]);

  private inactiveUsers = new Observable<string[]>([]);

  constructor() {
    socketService.subscribe(TypeName.userActive, this.onUserActive);
    socketService.subscribe(TypeName.userExternalLogin, this.onUserExternalLogin);
    socketService.subscribe(TypeName.userInactive, this.onUserInactive);
    socketService.subscribe(TypeName.userExternalLogout, this.onUserExternalLogout);
  }

  private onUserActive = (response: UsersActiveResponse) => {
    this.activeUsers.notify(
      response.payload.users
        .filter((user) => user.login !== loginService.getLogin())
        .map((user) => user.login),
    );
  };

  private onUserExternalLogin = (response: UserExternalLoginResponse) => {
    const { login } = response.payload.user;

    if (!this.activeUsers.getValue().includes(login)) {
      this.activeUsers.notify((prev) => {
        prev.push(login);
        return prev;
      });
    }

    if (this.inactiveUsers.getValue().includes(login)) {
      this.inactiveUsers.notify((prev) => {
        prev.splice(prev.indexOf(login), 1);
        return prev;
      });
    }
  };

  subscribeUserActive(callback: (userName: string[]) => void) {
    this.activeUsers.subscribe(callback);
  }

  private onUserInactive = (response: UsersInactiveResponse) => {
    this.inactiveUsers.notify(response.payload.users.map((user) => user.login));
    loginService.subscribeLogin((login) =>
      this.inactiveUsers.notify((prev) => prev.filter((user) => user !== login)),
    );
  };

  private onUserExternalLogout = (response: UserExternalLogoutResponse) => {
    const { login: logoutUser } = response.payload.user;

    if (!this.inactiveUsers.getValue().includes(logoutUser)) {
      this.inactiveUsers.notify((prev) => {
        prev.push(logoutUser);
        return prev;
      });
    }
    if (this.activeUsers.getValue().includes(logoutUser)) {
      this.activeUsers.notify((prev) => {
        prev.splice(prev.indexOf(logoutUser), 1);
        return prev;
      });
    }
  };

  subscribeUserInactive(callback: (userName: string[]) => void) {
    this.inactiveUsers.subscribe(callback);
  }
}

export const userListService = new UserListService();
