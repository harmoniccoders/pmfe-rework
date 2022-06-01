/* tslint:disable */
import { Property } from './property';
import { Transaction } from './transaction';
import { User } from './user';

export interface TenancyView {
  id?: number;
  tenant?: User;
  owner?: User;
  property?: Property;
  transaction?: Transaction;
  rentDueDate?: string;
  status?: null | string;
  renewable?: boolean;
}
