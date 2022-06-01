/* tslint:disable */
import { ComplaintsViewStandardResponse } from './complaints-view-standard-response';

export type ComplaintscreateResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? ComplaintsViewStandardResponse
    : TContentType extends 'application/json'
    ? ComplaintsViewStandardResponse
    : TContentType extends 'text/json'
    ? ComplaintsViewStandardResponse
    : any
  : any;
