/* tslint:disable */
import { ComplaintsSubCategoryStandardResponse } from './complaints-sub-category-standard-response';

export type ComplaintssubcategorycreateResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? ComplaintsSubCategoryStandardResponse
    : TContentType extends 'application/json'
    ? ComplaintsSubCategoryStandardResponse
    : TContentType extends 'text/json'
    ? ComplaintsSubCategoryStandardResponse
    : any
  : any;
