/* tslint:disable */
import { RequestViewPagedCollectionStandardResponse } from './request-view-paged-collection-standard-response';

export type RequestlistResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? RequestViewPagedCollectionStandardResponse
    : TContentType extends 'application/json'
    ? RequestViewPagedCollectionStandardResponse
    : TContentType extends 'text/json'
    ? RequestViewPagedCollectionStandardResponse
    : any
  : any;
