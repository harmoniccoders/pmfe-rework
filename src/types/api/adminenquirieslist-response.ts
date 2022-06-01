/* tslint:disable */
import { UserEnquiryViewPagedCollectionStandardResponse } from './user-enquiry-view-paged-collection-standard-response';

export type AdminenquirieslistResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? UserEnquiryViewPagedCollectionStandardResponse
    : TContentType extends 'application/json'
    ? UserEnquiryViewPagedCollectionStandardResponse
    : TContentType extends 'text/json'
    ? UserEnquiryViewPagedCollectionStandardResponse
    : any
  : any;
