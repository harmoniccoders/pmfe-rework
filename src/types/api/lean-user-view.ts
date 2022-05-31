/* tslint:disable */
import { MediaView } from './media-view';

export interface LeanUserView {
  id?: number;
  email?: null | string;
  fullName?: null | string;
  firstName?: null | string;
  lastName?: null | string;
  token?: null | string;
  phoneNumber?: null | string;
  passportPhotograph?: MediaView;
  workId?: MediaView;
  annualIncome?: null | string;
  maritalStatus?: null | string;
  occupation?: null | string;
  nationality?: null | string;
  dateOfBirth?: string;
  address?: null | string;
}
