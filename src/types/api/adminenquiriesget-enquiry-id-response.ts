/* tslint:disable */
import { UserEnquiryViewStandardResponse } from './user-enquiry-view-standard-response';

export type AdminenquiriesgetEnquiryIdResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? UserEnquiryViewStandardResponse
    : TContentType extends 'application/json'
    ? UserEnquiryViewStandardResponse
    : TContentType extends 'text/json'
    ? UserEnquiryViewStandardResponse
    : any
  : any;
