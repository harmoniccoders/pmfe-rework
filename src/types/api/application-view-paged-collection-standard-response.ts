/* tslint:disable */
import { ApplicationViewPagedCollection } from './application-view-paged-collection';

export interface ApplicationViewPagedCollectionStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: ApplicationViewPagedCollection;
  statusCode?: null | string;
  errors?: any;
}
