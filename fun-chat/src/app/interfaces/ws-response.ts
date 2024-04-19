import { TypeName } from 'Enums/type.name';
import { BaseResponseRequest } from './base-ws';

export interface UserResponse {
  login: string;
  isLogined: boolean;
}

export interface MessageResponse {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
  };
}

interface UserPayloadResponse {
  user: UserResponse;
}

interface UsersPayloadResponse {
  users: UserResponse[];
}

interface MessagePayloadResponse {
  message: MessageResponse;
}

interface MessageHistoryPayloadResponse {
  messages: MessageResponse[];
}

interface ErrorPayload {
  error: string;
}

export interface UserLoginResponse
  extends BaseResponseRequest<TypeName.login, UserPayloadResponse> {}
export interface UserLogoutResponse
  extends BaseResponseRequest<TypeName.logout, UserPayloadResponse> {}
export interface UsersActiveResponse
  extends BaseResponseRequest<TypeName.userActive, UsersPayloadResponse> {}
export interface UsersInactiveResponse
  extends BaseResponseRequest<TypeName.userInactive, UsersPayloadResponse> {}
export interface UserExternalLoginResponse
  extends BaseResponseRequest<TypeName.userExternalLogin, UserPayloadResponse> {}
export interface UserExternalLogoutResponse
  extends BaseResponseRequest<TypeName.userExternalLogout, UserPayloadResponse> {}
export interface SendingMessageResponse
  extends BaseResponseRequest<TypeName.msgSend, MessagePayloadResponse> {}
export interface MessageHistoryResponse
  extends BaseResponseRequest<TypeName.msgFromUser, MessageHistoryPayloadResponse> {}
export interface MessageReadStatusResponse
  extends BaseResponseRequest<TypeName.msgRead, MessagePayloadResponse> {}
export interface MessageDeletionResponse
  extends BaseResponseRequest<TypeName.msgDelete, MessagePayloadResponse> {}
export interface MessageTextEditingResponse
  extends BaseResponseRequest<TypeName.msgEdit, MessagePayloadResponse> {}
export interface ErrorResponse extends BaseResponseRequest<TypeName.error, ErrorPayload> {}
