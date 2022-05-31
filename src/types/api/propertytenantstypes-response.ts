/* tslint:disable */
import { TenantTypeIEnumerableStandardResponse } from './tenant-type-i-enumerable-standard-response';

export type PropertytenantstypesResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? TenantTypeIEnumerableStandardResponse
    : TContentType extends 'application/json'
    ? TenantTypeIEnumerableStandardResponse
    : TContentType extends 'text/json'
    ? TenantTypeIEnumerableStandardResponse
    : any
  : any;
