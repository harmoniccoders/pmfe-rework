/* tslint:disable */
import { ComplaintsSubCategory } from './complaints-sub-category';
import { Property } from './property';
import { Status } from './status';
import { User } from './user';

export interface Complaints {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  complaintsSubCategoryId?: number;
  complaintsSubCategory?: ComplaintsSubCategory;
  comment?: null | string;
  userId?: number;
  user?: User;
  statusId?: number;
  status?: Status;
  propertyId?: number;
  property?: Property;
}
