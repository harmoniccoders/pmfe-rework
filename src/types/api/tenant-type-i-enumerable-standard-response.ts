/* tslint:disable */
import { TenantType } from './tenant-type';

export interface TenantTypeIEnumerableStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: null | Array<TenantType>;
  statusCode?: null | string;
  errors?: any;
}
