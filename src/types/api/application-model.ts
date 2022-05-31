/* tslint:disable */
import { NextOfKinModel } from './next-of-kin-model';
import { Register } from './register';

export interface ApplicationModel {
  register?: Register;
  nextOfKin?: NextOfKinModel;
  applicationTypeId?: number;
  propertyId?: number;
  reliefAmount?: number;
  payBackDate?: string;
  repaymentFrequency?: null | string;
}
