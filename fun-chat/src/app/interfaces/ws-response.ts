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

interface MessageReadStatusPayloadResponse {
  message: {
    id: string;
    status: {
      isReaded: boolean;
    };
  };
}

interface MessageDeleteStatusPayloadResponse {
  message: {
    id: string;
    status: {
      isDeleted: boolean;
    };
  };
}

interface MessageEditStatusPayloadResponse {
  message: {
    id: string;
    text: string;
    status: {
      isEdited: boolean;
    };
  };
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
  extends BaseResponseRequest<TypeName.msgRead, MessageReadStatusPayloadResponse> {}
export interface MessageDeletionResponse
  extends BaseResponseRequest<TypeName.msgDelete, MessageDeleteStatusPayloadResponse> {}
export interface MessageTextEditingResponse
  extends BaseResponseRequest<TypeName.msgEdit, MessageEditStatusPayloadResponse> {}
export interface ErrorResponse extends BaseResponseRequest<TypeName.error, ErrorPayload> {}
