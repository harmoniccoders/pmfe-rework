/* tslint:disable */
import { PropertyViewPagedCollectionStandardResponse } from './property-view-paged-collection-standard-response';

export type PropertyusercreatedResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? PropertyViewPagedCollectionStandardResponse
    : TContentType extends 'application/json'
    ? PropertyViewPagedCollectionStandardResponse
    : TContentType extends 'text/json'
    ? PropertyViewPagedCollectionStandardResponse
    : any
  : any;
