/* tslint:disable */
import { RentCollectionTypeIEnumerableStandardResponse } from './rent-collection-type-i-enumerable-standard-response';

export type PropertycollectiontypesResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? RentCollectionTypeIEnumerableStandardResponse
    : TContentType extends 'application/json'
    ? RentCollectionTypeIEnumerableStandardResponse
    : TContentType extends 'text/json'
    ? RentCollectionTypeIEnumerableStandardResponse
    : any
  : any;
