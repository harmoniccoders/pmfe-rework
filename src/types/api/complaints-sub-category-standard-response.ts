/* tslint:disable */
import { ComplaintsSubCategory } from './complaints-sub-category';

export interface ComplaintsSubCategoryStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: ComplaintsSubCategory;
  statusCode?: null | string;
  errors?: any;
}
