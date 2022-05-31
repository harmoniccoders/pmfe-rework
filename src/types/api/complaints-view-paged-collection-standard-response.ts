/* tslint:disable */
import { ComplaintsViewPagedCollection } from './complaints-view-paged-collection';

export interface ComplaintsViewPagedCollectionStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: ComplaintsViewPagedCollection;
  statusCode?: null | string;
  errors?: any;
}
