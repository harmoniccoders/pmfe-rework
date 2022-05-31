/* tslint:disable */
import { TenancyViewStandardResponse } from './tenancy-view-standard-response';

export type TenancyrenewabletoggleIdResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? TenancyViewStandardResponse
    : TContentType extends 'application/json'
    ? TenancyViewStandardResponse
    : TContentType extends 'text/json'
    ? TenancyViewStandardResponse
    : any
  : any;
