/* tslint:disable */
import { PropertyRequestViewPagedCollection } from './property-request-view-paged-collection';

export interface PropertyRequestViewPagedCollectionStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: PropertyRequestViewPagedCollection;
  statusCode?: null | string;
  errors?: any;
}
