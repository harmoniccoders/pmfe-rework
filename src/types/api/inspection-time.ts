/* tslint:disable */
import { InspectionDate } from './inspection-date';

export interface InspectionTime {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  inspectionDateId?: number;
  inspectionDate?: InspectionDate;
  availableTime?: string;
  isAvailable?: boolean;
}
