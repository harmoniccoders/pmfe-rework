/* tslint:disable */
import { ReportViewPagedCollectionStandardResponse } from './report-view-paged-collection-standard-response';

export type ReportlistResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? ReportViewPagedCollectionStandardResponse
    : TContentType extends 'application/json'
    ? ReportViewPagedCollectionStandardResponse
    : TContentType extends 'text/json'
    ? ReportViewPagedCollectionStandardResponse
    : any
  : any;
