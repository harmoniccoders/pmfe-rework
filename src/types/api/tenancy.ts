/* tslint:disable */
import { Property } from './property';
import { Status } from './status';
import { Transaction } from './transaction';
import { User } from './user';

export interface Tenancy {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  tenantId?: number;
  tenant?: User;
  ownerId?: number;
  owner?: User;
  propertyId?: number;
  property?: Property;
  transactionId?: number;
  transaction?: Transaction;
  renewable?: boolean;
  rentDueDate?: string;
  statusId?: number;
  status?: Status;
}
