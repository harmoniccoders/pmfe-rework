/* tslint:disable */
import { UserViewPagedCollection } from './user-view-paged-collection';

export interface UserViewPagedCollectionStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: UserViewPagedCollection;
  statusCode?: null | string;
  errors?: any;
}
