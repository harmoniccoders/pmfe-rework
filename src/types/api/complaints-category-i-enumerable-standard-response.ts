/* tslint:disable */
import { ComplaintsCategory } from './complaints-category';

export interface ComplaintsCategoryIEnumerableStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: null | Array<ComplaintsCategory>;
  statusCode?: null | string;
  errors?: any;
}
