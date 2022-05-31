/* tslint:disable */
import { PropertyRequestView } from './property-request-view';

export interface PropertyRequestViewStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: PropertyRequestView;
  statusCode?: null | string;
  errors?: any;
}
