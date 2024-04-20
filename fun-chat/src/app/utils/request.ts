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
