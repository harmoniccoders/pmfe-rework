/* tslint:disable */
import { Link } from './link';
import { UserEnquiryView } from './user-enquiry-view';

export interface UserEnquiryViewPagedCollection {
  offset?: null | number;
  limit?: null | number;
  size?: number;
  first?: Link;
  previous?: Link;
  next?: Link;
  last?: Link;
  self?: Link;
  value?: null | Array<UserEnquiryView>;
}
