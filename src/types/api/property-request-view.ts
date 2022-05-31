/* tslint:disable */
import { PropertyRequestMatchView } from './property-request-match-view';
import { PropertyType } from './property-type';
import { User } from './user';

export interface PropertyRequestView {
  id?: number;
  propertyType?: PropertyType;
  state?: null | string;
  lga?: null | string;
  budget?: number;
  comment?: null | string;
  numberOfBedRooms?: number;
  numberOfBathrooms?: number;
  status?: null | string;
  user?: User;
  matches?: null | Array<PropertyRequestMatchView>;
}
