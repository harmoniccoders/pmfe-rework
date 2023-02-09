/* tslint:disable */
import { MediaModel } from './media-model';

export interface UpdateUserModel {
  id?: number;
  phoneNumber?: null | string;
  profilePicture?: MediaModel;
  bank?: null | string;
  accountNumber?: null | string;
}
