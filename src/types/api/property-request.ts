/* tslint:disable */
import { PropertyRequestMatch } from './property-request-match';
import { PropertyType } from './property-type';
import { Status } from './status';
import { User } from './user';

export interface PropertyRequest {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  propertyTypeId?: number;
  propertyType?: PropertyType;
  state?: null | string;
  lga?: null | string;
  budget?: number;
  comment?: null | string;
  numberOfBedRooms?: number;
  numberOfBathrooms?: number;
  userId?: number;
  user?: User;
  statusId?: number;
  status?: Status;
  matches?: null | Array<PropertyRequestMatch>;
}
