/* tslint:disable */
import { ComplaintsViewPagedCollectionStandardResponse } from './complaints-view-paged-collection-standard-response';

export type ComplaintspropertyPropertyIdListResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? ComplaintsViewPagedCollectionStandardResponse
    : TContentType extends 'application/json'
    ? ComplaintsViewPagedCollectionStandardResponse
    : TContentType extends 'text/json'
    ? ComplaintsViewPagedCollectionStandardResponse
    : any
  : any;
