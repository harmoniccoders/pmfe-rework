/* tslint:disable */
import { TenancyViewPagedCollectionStandardResponse } from './tenancy-view-paged-collection-standard-response';

export type AdmintenanciesResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? TenancyViewPagedCollectionStandardResponse
    : TContentType extends 'application/json'
    ? TenancyViewPagedCollectionStandardResponse
    : TContentType extends 'text/json'
    ? TenancyViewPagedCollectionStandardResponse
    : any
  : any;
