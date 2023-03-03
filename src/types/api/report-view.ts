/* tslint:disable */
import { Property } from './property';
import { User } from './user';

export interface ReportView {
  id?: number;
  property?: Property;
  user?: User;
  description?: null | string;
  usersName?: null | string;
  dateCreated?: string;
  email?: null | string;
}
