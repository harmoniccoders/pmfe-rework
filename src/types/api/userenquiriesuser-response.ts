/* tslint:disable */
import { UserEnquiryPagedCollectionStandardResponse } from './user-enquiry-paged-collection-standard-response';

export type UserenquiriesuserResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? UserEnquiryPagedCollectionStandardResponse
    : TContentType extends 'application/json'
    ? UserEnquiryPagedCollectionStandardResponse
    : TContentType extends 'text/json'
    ? UserEnquiryPagedCollectionStandardResponse
    : any
  : any;
