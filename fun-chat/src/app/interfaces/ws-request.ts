import { TypeName } from 'Enums/type.name';
import { BaseResponseRequest } from './base-ws';

export interface UserRequest {
  login: string;
  password: string;
}

export interface MessageRequest {
  to: string;
  text: string;
}

interface UserPayloadRequest {
  user: UserRequest;
}

interface SendMessagePayloadRequest {
  message: MessageRequest;
}

interface MessageHistoryPayloadRequest {
  user: {
    login: string;
  };
}

interface MessagePayloadRequest {
  message: {
    id: string;
  };
}

interface EditMessagePayloadRequest {
  message: {
    id: string;
    text: string;
  };
}

export interface UserLoginRequest extends BaseResponseRequest<TypeName.login, UserPayloadRequest> {}
export interface UserLogoutRequest
  extends BaseResponseRequest<TypeName.logout, UserPayloadRequest> {}
export interface UsersActiveRequest extends BaseResponseRequest<TypeName.userActive, null> {}
export interface UsersInactiveRequest extends BaseResponseRequest<TypeName.userInactive, null> {}

export interface SendingMessageRequest
  extends BaseResponseRequest<TypeName.msgSend, SendMessagePayloadRequest> {}
export interface MessageHistoryRequest
  extends BaseResponseRequest<TypeName.msgFromUser, MessageHistoryPayloadRequest> {}

export interface MessageReadStatusRequest
  extends BaseResponseRequest<TypeName.msgRead, MessagePayloadRequest> {}
export interface MessageDeletionRequest
  extends BaseResponseRequest<TypeName.msgDelete, MessagePayloadRequest> {}
export interface MessageTextEditingRequest
  extends BaseResponseRequest<TypeName.msgEdit, EditMessagePayloadRequest> {}

export type WSRequest =
  | UserLoginRequest
  | UserLogoutRequest
  | UsersActiveRequest
  | UsersInactiveRequest
  | SendingMessageRequest
  | MessageHistoryRequest
  | MessageReadStatusRequest
  | MessageDeletionRequest
  | MessageTextEditingRequest;
