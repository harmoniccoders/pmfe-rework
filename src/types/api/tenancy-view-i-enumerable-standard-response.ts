/* tslint:disable */
import { TenancyView } from './tenancy-view';

export interface TenancyViewIEnumerableStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: null | Array<TenancyView>;
  statusCode?: null | string;
  errors?: any;
}
