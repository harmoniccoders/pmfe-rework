/* tslint:disable */
import { Link } from './link';
import { Transaction } from './transaction';

export interface TransactionPagedCollection {
  offset?: null | number;
  limit?: null | number;
  size?: number;
  first?: Link;
  previous?: Link;
  next?: Link;
  last?: Link;
  self?: Link;
  value?: null | Array<Transaction>;
}
