/* tslint:disable */
import { ComplaintsCategory } from './complaints-category';

export interface ComplaintsSubCategory {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  name?: null | string;
  complantsCategoryId?: number;
  complantsCategory?: ComplaintsCategory;
}
