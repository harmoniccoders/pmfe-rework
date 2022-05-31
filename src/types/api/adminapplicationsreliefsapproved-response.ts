/* tslint:disable */
import { ApplicationViewPagedCollectionStandardResponse } from './application-view-paged-collection-standard-response';

export type AdminapplicationsreliefsapprovedResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? ApplicationViewPagedCollectionStandardResponse
    : TContentType extends 'application/json'
    ? ApplicationViewPagedCollectionStandardResponse
    : TContentType extends 'text/json'
    ? ApplicationViewPagedCollectionStandardResponse
    : any
  : any;
