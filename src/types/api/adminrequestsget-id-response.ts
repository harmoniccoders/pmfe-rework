/* tslint:disable */
import { PropertyRequestViewStandardResponse } from './property-request-view-standard-response';

export type AdminrequestsgetIdResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? PropertyRequestViewStandardResponse
    : TContentType extends 'application/json'
    ? PropertyRequestViewStandardResponse
    : TContentType extends 'text/json'
    ? PropertyRequestViewStandardResponse
    : any
  : any;
