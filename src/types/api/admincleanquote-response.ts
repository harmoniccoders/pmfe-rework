/* tslint:disable */
import { CleaningQuoteViewStandardResponse } from './cleaning-quote-view-standard-response';

export type AdmincleanquoteResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? CleaningQuoteViewStandardResponse
    : TContentType extends 'application/json'
    ? CleaningQuoteViewStandardResponse
    : TContentType extends 'text/json'
    ? CleaningQuoteViewStandardResponse
    : any
  : any;
