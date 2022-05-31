/* tslint:disable */
import { ApplicationTypeIEnumerableStandardResponse } from './application-type-i-enumerable-standard-response';

export type ApplicationtypesResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? ApplicationTypeIEnumerableStandardResponse
    : TContentType extends 'application/json'
    ? ApplicationTypeIEnumerableStandardResponse
    : TContentType extends 'text/json'
    ? ApplicationTypeIEnumerableStandardResponse
    : any
  : any;
