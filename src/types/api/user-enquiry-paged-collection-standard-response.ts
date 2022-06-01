/* tslint:disable */
import { UserEnquiryPagedCollection } from './user-enquiry-paged-collection';

export interface UserEnquiryPagedCollectionStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: UserEnquiryPagedCollection;
  statusCode?: null | string;
  errors?: any;
}
