/* tslint:disable */
import { TenancyViewPagedCollection } from './tenancy-view-paged-collection';

export interface TenancyViewPagedCollectionStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: TenancyViewPagedCollection;
  statusCode?: null | string;
  errors?: any;
}
