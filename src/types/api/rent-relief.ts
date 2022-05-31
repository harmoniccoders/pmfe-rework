/* tslint:disable */
import { Installment } from './installment';
import { Property } from './property';
import { User } from './user';

export interface RentRelief {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  propertyId?: number;
  property?: Property;
  userId?: number;
  user?: User;
  installments?: null | Array<Installment>;
}
