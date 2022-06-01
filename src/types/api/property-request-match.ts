/* tslint:disable */
import { Property } from './property';
import { PropertyRequest } from './property-request';

export interface PropertyRequestMatch {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  propertyId?: number;
  property?: Property;
  propertyRequestId?: number;
  propertyRequest?: PropertyRequest;
}
