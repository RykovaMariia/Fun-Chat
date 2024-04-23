import { TypeName } from 'Enums/type.name';
import { socketService } from 'Services/socket-service';

export function requestMessageHistory(login: string) {
  socketService.sendMessage({
    id: '',
    type: TypeName.msgFromUser,
    payload: {
      user: {
        login,
      },
    },
  });
}

export function requestMessageReadStatusChange(messageId: string) {
  socketService.sendMessage({
    id: '',
    type: TypeName.msgRead,
    payload: {
      message: {
        id: messageId,
      },
    },
  });
}

export function requestActiveAndInactiveUsers() {
  socketService.sendMessage({
    id: '',
    type: TypeName.userActive,
    payload: null,
  });

  socketService.sendMessage({
    id: '',
    type: TypeName.userInactive,
    payload: null,
  });
}
