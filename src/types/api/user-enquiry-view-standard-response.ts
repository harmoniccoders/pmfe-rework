/* tslint:disable */
import { UserEnquiryView } from './user-enquiry-view';

export interface UserEnquiryViewStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: UserEnquiryView;
  statusCode?: null | string;
  errors?: any;
}
