/* tslint:disable */
import { MediaModel } from './media-model';

export interface Register {
  email: string;
  password?: null | string;
  firstName: string;
  lastName: string;
  middleName?: null | string;
  phoneNumber?: null | string;
  phoneNumber1?: null | string;
  address?: null | string;
  dateOfBirth?: string;
  nationality?: null | string;
  maritalStatus?: null | string;
  employer?: null | string;
  occupation?: null | string;
  companyName?: null | string;
  workAddress?: null | string;
  annualIncome?: null | string;
  passportPhotograph?: MediaModel;
  workId?: MediaModel;
}
