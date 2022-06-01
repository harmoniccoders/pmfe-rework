/* tslint:disable */
import { ComplaintsCategoryStandardResponse } from './complaints-category-standard-response';

export type ComplaintscategoriescreateResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? ComplaintsCategoryStandardResponse
    : TContentType extends 'application/json'
    ? ComplaintsCategoryStandardResponse
    : TContentType extends 'text/json'
    ? ComplaintsCategoryStandardResponse
    : any
  : any;
