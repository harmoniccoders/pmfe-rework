/* tslint:disable */
import { ApplicationStatusView } from './application-status-view';

export interface ApplicationStatusViewStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: ApplicationStatusView;
  statusCode?: null | string;
  errors?: any;
}
