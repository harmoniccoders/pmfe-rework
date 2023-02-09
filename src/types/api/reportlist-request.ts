/* tslint:disable */
import { PagingOptions } from './paging-options';

export type ReportlistRequest<
  TCode extends
    | 'application/json-patch+json'
    | 'application/json'
    | 'text/json'
    | 'application/*+json' =
    | 'application/json-patch+json'
    | 'application/json'
    | 'text/json'
    | 'application/*+json'
> = TCode extends 'application/json-patch+json'
  ? PagingOptions
  : TCode extends 'application/json'
  ? PagingOptions
  : TCode extends 'text/json'
  ? PagingOptions
  : TCode extends 'application/*+json'
  ? PagingOptions
  : any;
