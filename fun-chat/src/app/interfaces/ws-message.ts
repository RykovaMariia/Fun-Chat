import { ResponseType } from 'Enums/response-type';

export interface BaseResponse<TResponseType extends ResponseType, TPayload> {
  id: '';
  type: TResponseType;
  payload: TPayload;
}

export interface UserPayload {
  user: {
    login: string;
    isLogined: boolean;
  };
}

export interface MessagePayload {
  message: {
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
  };
}

export interface ErrorPayload {
  error: string;
}

export interface UserLoginResponse extends BaseResponse<ResponseType.login, UserPayload> {}
export interface UserLogoutResponse extends BaseResponse<ResponseType.logout, UserPayload> {}
export interface UsersActiveResponse extends BaseResponse<ResponseType.userActive, UserPayload> {}
export interface UsersInactiveResponse
  extends BaseResponse<ResponseType.userInactive, UserPayload[]> {}
export interface SendingMessageResponse
  extends BaseResponse<ResponseType.msgSend, MessagePayload> {}
export interface MessageHistoryResponse
  extends BaseResponse<ResponseType.msgFromUser, MessagePayload[]> {}
export interface MessageReadStatusResponse
  extends BaseResponse<ResponseType.msgRead, MessagePayload> {}
export interface MessageDeletionResponse
  extends BaseResponse<ResponseType.msgDelete, MessagePayload> {}
export interface MessageTextEditingResponse
  extends BaseResponse<ResponseType.msgEdit, MessagePayload> {}
export interface ErrorResponse extends BaseResponse<ResponseType.error, ErrorPayload> {}
