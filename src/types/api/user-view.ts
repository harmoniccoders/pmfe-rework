/* tslint:disable */
import { MediaView } from './media-view';
import { PropertyView } from './property-view';

export interface UserView {
  id?: number;
  email?: null | string;
  fullName?: null | string;
  firstName?: null | string;
  lastName?: null | string;
  companyName?: null | string;
  token?: null | string;
  phoneNumber?: null | string;
  phoneNumber1?: null | string;
  properties?: null | Array<PropertyView>;
  passportPhotograph?: MediaView;
  workId?: MediaView;
  annualIncome?: null | string;
  maritalStatus?: null | string;
  occupation?: null | string;
  nationality?: null | string;
  dateOfBirth?: string;
  address?: null | string;
  profilePicture?: null | string;
  bank?: null | string;
  accountNumber?: null | string;
}
