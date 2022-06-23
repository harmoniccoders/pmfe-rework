/* tslint:disable */
import { Property } from './property';
import { PropertyRequest } from './property-request';
import { Status } from './status';

export interface PropertyRequestMatch {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  propertyId?: number;
  property?: Property;
  propertyRequestId?: number;
  propertyRequest?: PropertyRequest;
  status?: Status;
  statusId?: number;
}
