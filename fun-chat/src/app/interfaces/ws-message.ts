import { ResponseType } from 'Enums/response-type';

export interface BaseResponse<TResponseType extends ResponseType, TPayload> {
  id: string | null;
  type: TResponseType;
  payload: TPayload;
}

export interface UserPayloadResponse {
  user: {
    login: string;
    isLogined: boolean;
  };
}

export interface UsersPayloadResponse {
  users: {
    login: string;
    isLogined: boolean;
  }[];
}

export interface UserPayloadRequest {
  user: {
    login: string;
    password: string;
  };
}

export interface Message {
  id: string;
  from?: string;
  to?: string;
  text?: string;
  datetime?: number;
  status?: {
    isDelivered?: boolean;
    isReaded?: boolean;
    isEdited?: boolean;
  };
}

export interface MessagePayloadResponse {
  message: Message;
}

export interface MessageHistoryPayloadResponse {
  messages: Message[];
}

export interface ErrorPayload {
  error: string;
}

export interface UserLoginResponse extends BaseResponse<ResponseType.login, UserPayloadResponse> {}
export interface UserLogoutResponse
  extends BaseResponse<ResponseType.logout, UserPayloadResponse> {}
export interface UsersActiveResponse
  extends BaseResponse<ResponseType.userActive, UsersPayloadResponse> {}
export interface UsersInactiveResponse
  extends BaseResponse<ResponseType.userInactive, UsersPayloadResponse> {}
export interface UserExternalLoginResponse
  extends BaseResponse<ResponseType.userExternalLogin, UserPayloadResponse> {}
export interface UserExternalLogoutResponse
  extends BaseResponse<ResponseType.userExternalLogout, UserPayloadResponse> {}
export interface SendingMessageResponse
  extends BaseResponse<ResponseType.msgSend, MessagePayloadResponse> {}
export interface MessageHistoryResponse
  extends BaseResponse<ResponseType.msgFromUser, MessageHistoryPayloadResponse> {}
export interface MessageReadStatusResponse
  extends BaseResponse<ResponseType.msgRead, MessagePayloadResponse> {}
export interface MessageDeletionResponse
  extends BaseResponse<ResponseType.msgDelete, MessagePayloadResponse> {}
export interface MessageTextEditingResponse
  extends BaseResponse<ResponseType.msgEdit, MessagePayloadResponse> {}
export interface ErrorResponse extends BaseResponse<ResponseType.error, ErrorPayload> {}
