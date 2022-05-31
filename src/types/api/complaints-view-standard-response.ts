/* tslint:disable */
import { ComplaintsView } from './complaints-view';

export interface ComplaintsViewStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: ComplaintsView;
  statusCode?: null | string;
  errors?: any;
}
