/* tslint:disable */
import { InspectionView } from './inspection-view';

export interface UserEnquiryView {
  userId?: null | number;
  propertyId?: number;
  propertyName?: null | string;
  active?: boolean;
  fullName?: null | string;
  state?: null | string;
  lga?: null | string;
  area?: null | string;
  dateCreated?: string;
  inspection?: null | Array<InspectionView>;
}
