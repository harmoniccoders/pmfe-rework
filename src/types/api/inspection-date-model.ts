/* tslint:disable */
import { InspectionTimeModel } from './inspection-time-model';

export interface InspectionDateModel {
  propertyId?: number;
  date?: string;
  times?: null | Array<InspectionTimeModel>;
}
