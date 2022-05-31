/* tslint:disable */
import { ApplicationType } from './application-type';
import { NextOfKin } from './next-of-kin';
import { Property } from './property';
import { Status } from './status';
import { User } from './user';

export interface Application {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  userId?: number;
  user?: User;
  propertyId?: null | number;
  property?: Property;
  nextOfKinId?: number;
  nextOfKin?: NextOfKin;
  applicationTypeId?: number;
  applicationType?: ApplicationType;
  statusId?: number;
  status?: Status;
  reliefAmount?: number;
  payBackDate?: string;
  repaymentFrequency?: null | string;
}
