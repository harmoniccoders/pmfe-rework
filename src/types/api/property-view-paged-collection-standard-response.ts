/* tslint:disable */
import { PropertyViewPagedCollection } from './property-view-paged-collection';

export interface PropertyViewPagedCollectionStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: PropertyViewPagedCollection;
  statusCode?: null | string;
  errors?: any;
}
