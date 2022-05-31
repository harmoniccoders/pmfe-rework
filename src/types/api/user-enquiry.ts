/* tslint:disable */
import { Property } from './property';
import { User } from './user';

export interface UserEnquiry {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  userId?: null | number;
  user?: User;
  propertyId?: number;
  property?: Property;
  active?: boolean;
}
