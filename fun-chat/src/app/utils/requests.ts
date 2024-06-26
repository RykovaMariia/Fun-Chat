import { TypeName } from 'Enums/type.name';
import { socketService } from 'Services/socket-service';

export function requestMessageHistory(login: string, id?: string) {
  socketService.sendMessage({
    id: id || '',
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

export function requestDeleteMessage(idMessage: string) {
  socketService.sendMessage({
    id: '',
    type: TypeName.msgDelete,
    payload: {
      message: {
        id: idMessage,
      },
    },
  });
}

export function requestEditMessage(idMessage: string, editedMessage: string) {
  socketService.sendMessage({
    id: '',
    type: TypeName.msgEdit,
    payload: {
      message: {
        id: idMessage,
        text: editedMessage,
      },
    },
  });
}
