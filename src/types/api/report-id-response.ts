/* tslint:disable */
import { ReportViewStandardResponse } from './report-view-standard-response';

export type ReportIdResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? ReportViewStandardResponse
    : TContentType extends 'application/json'
    ? ReportViewStandardResponse
    : TContentType extends 'text/json'
    ? ReportViewStandardResponse
    : any
  : any;
