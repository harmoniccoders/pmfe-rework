/* tslint:disable */
import { ComplaintsCategory } from './complaints-category';

export interface ComplaintsCategoryStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: ComplaintsCategory;
  statusCode?: null | string;
  errors?: any;
}
