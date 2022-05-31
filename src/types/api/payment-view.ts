/* tslint:disable */
import { Property } from './property';
import { Transaction } from './transaction';
import { User } from './user';

export interface PaymentView {
  status?: null | string;
  property?: Property;
  user?: User;
  transaction?: Transaction;
  isRelief?: boolean;
}
