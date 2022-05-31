/* tslint:disable */
import { ComplaintsSubCategory } from './complaints-sub-category';

export type ComplaintssubcategorycreateRequest<
  TCode extends
    | 'application/json-patch+json'
    | 'application/json'
    | 'text/json'
    | 'application/*+json' =
    | 'application/json-patch+json'
    | 'application/json'
    | 'text/json'
    | 'application/*+json'
> = TCode extends 'application/json-patch+json'
  ? ComplaintsSubCategory
  : TCode extends 'application/json'
  ? ComplaintsSubCategory
  : TCode extends 'text/json'
  ? ComplaintsSubCategory
  : TCode extends 'application/*+json'
  ? ComplaintsSubCategory
  : any;
