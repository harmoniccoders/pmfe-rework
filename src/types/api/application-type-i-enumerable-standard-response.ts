/* tslint:disable */
import { ApplicationType } from './application-type';

export interface ApplicationTypeIEnumerableStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: null | Array<ApplicationType>;
  statusCode?: null | string;
  errors?: any;
}
