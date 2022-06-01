/* tslint:disable */
import { RentRelief } from './rent-relief';
import { Status } from './status';

export interface Installment {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  amount?: number;
  dateDue?: string;
  statusId?: number;
  status?: Status;
  rentReliefId?: number;
  rentRelief?: RentRelief;
  paidOn?: string;
}
