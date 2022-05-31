/* tslint:disable */
import { PropertyRequestViewPagedCollectionStandardResponse } from './property-request-view-paged-collection-standard-response';

export type PropertyRequestlistuserResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? PropertyRequestViewPagedCollectionStandardResponse
    : TContentType extends 'application/json'
    ? PropertyRequestViewPagedCollectionStandardResponse
    : TContentType extends 'text/json'
    ? PropertyRequestViewPagedCollectionStandardResponse
    : any
  : any;
