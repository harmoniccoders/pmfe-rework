/* tslint:disable */
import { ComplaintsCategoryIEnumerableStandardResponse } from './complaints-category-i-enumerable-standard-response';

export type ComplaintscategorieslistResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? ComplaintsCategoryIEnumerableStandardResponse
    : TContentType extends 'application/json'
    ? ComplaintsCategoryIEnumerableStandardResponse
    : TContentType extends 'text/json'
    ? ComplaintsCategoryIEnumerableStandardResponse
    : any
  : any;
