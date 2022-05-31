/* tslint:disable */
import { NextOfKin } from './next-of-kin';
import { PropertyView } from './property-view';
import { UserView } from './user-view';

export interface ApplicationView {
  id?: number;
  user?: UserView;
  nextOfKin?: NextOfKin;
  applicationType?: null | string;
  property?: PropertyView;
  status?: null | string;
  reliefAmount?: number;
  dateCreated?: string;
}
