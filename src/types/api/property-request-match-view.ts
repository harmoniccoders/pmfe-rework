/* tslint:disable */
import { PropertyRequest } from './property-request';
import { PropertyView } from './property-view';

export interface PropertyRequestMatchView {
  id?: number;
  property?: PropertyView;
  propertyRequest?: PropertyRequest;
}
