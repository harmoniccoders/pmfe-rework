/* tslint:disable */
import { TenancyViewIEnumerableStandardResponse } from './tenancy-view-i-enumerable-standard-response';

export type TenancylandlordResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? TenancyViewIEnumerableStandardResponse
    : TContentType extends 'application/json'
    ? TenancyViewIEnumerableStandardResponse
    : TContentType extends 'text/json'
    ? TenancyViewIEnumerableStandardResponse
    : any
  : any;
