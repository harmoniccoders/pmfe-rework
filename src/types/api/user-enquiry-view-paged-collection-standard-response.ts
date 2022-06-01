/* tslint:disable */
import { UserEnquiryViewPagedCollection } from './user-enquiry-view-paged-collection';

export interface UserEnquiryViewPagedCollectionStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: UserEnquiryViewPagedCollection;
  statusCode?: null | string;
  errors?: any;
}
