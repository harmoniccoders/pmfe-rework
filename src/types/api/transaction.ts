/* tslint:disable */
import { Installment } from './installment';
import { PaymentLog } from './payment-log';
import { Property } from './property';
import { RentRelief } from './rent-relief';
import { Status } from './status';
import { Tenancy } from './tenancy';
import { User } from './user';

export interface Transaction {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  userId?: number;
  user?: User;
  propertyId?: null | number;
  rentReliefId?: null | number;
  rentRelief?: RentRelief;
  property?: Property;
  transactionReference?: null | string;
  paymentLogId?: null | number;
  paymentLog?: PaymentLog;
  statusId?: number;
  status?: Status;
  amount?: null | string;
  description?: null | string;
  title?: null | string;
  installmentId?: null | number;
  installment?: Installment;
  tenancyId?: null | number;
  tenancy?: Tenancy;
}
