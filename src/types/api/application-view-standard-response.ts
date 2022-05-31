/* tslint:disable */
import { ApplicationView } from './application-view';

export interface ApplicationViewStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: ApplicationView;
  statusCode?: null | string;
  errors?: any;
}
