/* tslint:disable */
import { InspectionTimeView } from './inspection-time-view';

export interface InspectionDateView {
  id?: number;
  date?: string;
  times?: null | Array<InspectionTimeView>;
}
