import { ResponseType } from 'Enums/response-type';
import {
  UsersActiveResponse,
  UsersExternalResponse,
  UsersInactiveResponse,
} from 'Interfaces/ws-message';
import { Observable } from 'Services/observable';
import { socketService } from 'Services/socket-service';

class UserListService {
  private activeUsers = new Observable<string[]>([]);

  private inactiveUsers = new Observable<string[]>([]);

  constructor() {
    socketService.subscribe(ResponseType.userActive, this.onUserActive);
    socketService.subscribe(ResponseType.userExternalLogin, this.onUserExternalLogin);
    socketService.subscribe(ResponseType.userInactive, this.onUserInactive);

    socketService.sendMessage({
      id: '',
      type: ResponseType.userActive,
      payload: null,
    });
  }

  onUserActive = (response: UsersActiveResponse) => {
    this.activeUsers.notify(response.payload.users.map((user) => user.login));
  };

  onUserExternalLogin = (response: UsersExternalResponse) => {
    this.activeUsers.notify((prev) => {
      const { login } = response.payload.user;
      if (!prev.includes(login)) {
        prev.push(login);
      }
      return prev;
    });
  };

  subscribeUserActive(callback: (userName: string[]) => void) {
    this.activeUsers.subscribe(callback, true);
  }

  onUserInactive = (response: UsersInactiveResponse) => {
    this.inactiveUsers.notify(response.payload.users.map((user) => user.login));
  };
}

export const userListService = new UserListService();
