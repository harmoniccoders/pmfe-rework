/* tslint:disable */
import { InspectionDateView } from './inspection-date-view';
import { InspectionTimeView } from './inspection-time-view';

export interface InspectionView {
  id?: number;
  inspectionTime?: InspectionTimeView;
  inspectionDate?: InspectionDateView;
}
