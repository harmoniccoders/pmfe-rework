/* tslint:disable */
import { UserViewPagedCollectionStandardResponse } from './user-view-paged-collection-standard-response';

export type UserlistResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? UserViewPagedCollectionStandardResponse
    : TContentType extends 'application/json'
    ? UserViewPagedCollectionStandardResponse
    : TContentType extends 'text/json'
    ? UserViewPagedCollectionStandardResponse
    : any
  : any;
