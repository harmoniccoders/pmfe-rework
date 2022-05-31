/* tslint:disable */
import { InspectionDate } from './inspection-date';
import { InspectionTime } from './inspection-time';
import { Property } from './property';
import { User } from './user';

export interface Inspections {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  inspectionDateId?: number;
  inspectionTimeId?: number;
  inspectionDate?: InspectionDate;
  inspectionTime?: InspectionTime;
  userId?: number;
  propertyId?: number;
  user?: User;
  property?: Property;
}
