/* tslint:disable */
import { RequestViewPagedCollection } from './request-view-paged-collection';

export interface RequestViewPagedCollectionStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: RequestViewPagedCollection;
  statusCode?: null | string;
  errors?: any;
}
