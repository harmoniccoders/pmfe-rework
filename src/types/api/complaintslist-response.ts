/* tslint:disable */
import { ComplaintsViewIEnumerableStandardResponse } from './complaints-view-i-enumerable-standard-response';

export type ComplaintslistResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? ComplaintsViewIEnumerableStandardResponse
    : TContentType extends 'application/json'
    ? ComplaintsViewIEnumerableStandardResponse
    : TContentType extends 'text/json'
    ? ComplaintsViewIEnumerableStandardResponse
    : any
  : any;
