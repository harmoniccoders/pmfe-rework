/* tslint:disable */
import { CleaningViewPagedCollection } from './cleaning-view-paged-collection';

export type AdmincleanrequestslistResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? CleaningViewPagedCollection
    : TContentType extends 'application/json'
    ? CleaningViewPagedCollection
    : TContentType extends 'text/json'
    ? CleaningViewPagedCollection
    : any
  : any;
