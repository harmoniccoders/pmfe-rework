/* tslint:disable */
import { Link } from './link';
import { UserEnquiry } from './user-enquiry';

export interface UserEnquiryPagedCollection {
  offset?: null | number;
  limit?: null | number;
  size?: number;
  first?: Link;
  previous?: Link;
  next?: Link;
  last?: Link;
  self?: Link;
  value?: null | Array<UserEnquiry>;
}
