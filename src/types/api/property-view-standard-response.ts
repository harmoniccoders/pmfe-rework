/* tslint:disable */
import { PropertyView } from './property-view';

export interface PropertyViewStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: PropertyView;
  statusCode?: null | string;
  errors?: any;
}
