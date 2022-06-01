/* tslint:disable */
import { InspectionTime } from './inspection-time';
import { Inspections } from './inspections';
import { Property } from './property';

export interface InspectionDate {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  propertyId?: number;
  property?: Property;
  date?: string;
  times?: null | Array<InspectionTime>;
  inspections?: null | Array<Inspections>;
}
