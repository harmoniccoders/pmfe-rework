/* tslint:disable */
import { LandSearchViewPagedCollectionStandardResponse } from './land-search-view-paged-collection-standard-response';

export type LandSearchuserlistResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? LandSearchViewPagedCollectionStandardResponse
    : TContentType extends 'application/json'
    ? LandSearchViewPagedCollectionStandardResponse
    : TContentType extends 'text/json'
    ? LandSearchViewPagedCollectionStandardResponse
    : any
  : any;
