/* tslint:disable */
import { User } from './user';

export interface Report {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  propertyId?: number;
  userId?: number;
  user?: User;
  description?: number;
}
