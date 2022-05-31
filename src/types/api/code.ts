/* tslint:disable */
import { User } from './user';

export interface Code {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  codeString: string;
  key?: null | string;
  userId?: null | number;
  user?: User;
  expiryDate?: string;
  isExpired?: boolean;
  token?: null | string;
}
