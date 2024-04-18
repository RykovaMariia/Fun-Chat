import { TypeName } from 'Enums/type.name';

export interface BaseResponseRequest<TResponseType extends TypeName, TPayload> {
  id: string | null;
  type: TResponseType;
  payload: TPayload;
}

export interface User {
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
