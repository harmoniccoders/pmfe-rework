/* tslint:disable */
import { CleaningQuote } from './cleaning-quote';
import { PropertyType } from './property-type';
import { Status } from './status';
import { User } from './user';

export interface Cleaning {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  buildingState?: null | string;
  propertyTypeId?: number;
  propertyType?: PropertyType;
  dateNeeded?: string;
  numberOfBathrooms?: number;
  numberOfBedrooms?: number;
  numberOfFloors?: number;
  buildingType?: null | string;
  userId?: number;
  user?: User;
  statusId?: number;
  status?: Status;
  cleaningQuotes?: null | Array<CleaningQuote>;
}
