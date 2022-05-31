/* tslint:disable */
import { Property } from './property';

export interface RequestView {
  id?: number;
  property?: Property;
  comment?: null | string;
  budget?: null | string;
  isCleaning?: boolean;
  isFixing?: boolean;
  status?: null | string;
}
