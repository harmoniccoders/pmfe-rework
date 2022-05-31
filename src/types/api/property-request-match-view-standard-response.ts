/* tslint:disable */
import { PropertyRequestMatchView } from './property-request-match-view';

export interface PropertyRequestMatchViewStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: PropertyRequestMatchView;
  statusCode?: null | string;
  errors?: any;
}
