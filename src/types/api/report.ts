/* tslint:disable */
import { Property } from './property';
import { User } from './user';

export interface Report {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  propertyId?: number;
  userId?: null | number;
  user?: User;
  description?: null | string;
  email?: null | string;
  property?: Property;
}
