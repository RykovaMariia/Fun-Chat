import { ResponseType } from 'Enums/response-type';

export interface BaseResponse<TResponseType extends ResponseType, TPayload> {
  id: '';
  type: TResponseType;
  payload: TPayload;
}

export interface UserPayloadResponse {
  user: {
    login: string;
    isLogined: boolean;
  };
}

export interface UserPayloadRequest {
  user: {
    login: string;
    password: string;
  };
}

export interface MessagePayloadResponse {
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

export interface UserLoginResponse extends BaseResponse<ResponseType.login, UserPayloadResponse> {}
export interface UserLogoutResponse
  extends BaseResponse<ResponseType.logout, UserPayloadResponse> {}
export interface UsersActiveResponse
  extends BaseResponse<ResponseType.userActive, UserPayloadResponse> {}
export interface UsersInactiveResponse
  extends BaseResponse<ResponseType.userInactive, UserPayloadResponse[]> {}
export interface SendingMessageResponse
  extends BaseResponse<ResponseType.msgSend, MessagePayloadResponse> {}
export interface MessageHistoryResponse
  extends BaseResponse<ResponseType.msgFromUser, MessagePayloadResponse[]> {}
export interface MessageReadStatusResponse
  extends BaseResponse<ResponseType.msgRead, MessagePayloadResponse> {}
export interface MessageDeletionResponse
  extends BaseResponse<ResponseType.msgDelete, MessagePayloadResponse> {}
export interface MessageTextEditingResponse
  extends BaseResponse<ResponseType.msgEdit, MessagePayloadResponse> {}
export interface ErrorResponse extends BaseResponse<ResponseType.error, ErrorPayload> {}

export interface UserLoginRequest extends BaseResponse<ResponseType.login, UserPayloadResponse> {}
