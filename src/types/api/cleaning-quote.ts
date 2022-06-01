/* tslint:disable */
import { Cleaning } from './cleaning';
import { Status } from './status';

export interface CleaningQuote {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  quote?: number;
  proposedDate?: string;
  statusId?: number;
  status?: Status;
  cleaningId?: number;
  cleaning?: Cleaning;
}
