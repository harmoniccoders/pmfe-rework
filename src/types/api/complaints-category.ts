/* tslint:disable */
import { ComplaintsSubCategory } from './complaints-sub-category';

export interface ComplaintsCategory {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  name?: null | string;
  complaintsSubCategories?: null | Array<ComplaintsSubCategory>;
}
