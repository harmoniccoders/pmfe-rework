/* tslint:disable */
import { CleaningViewStandardResponse } from './cleaning-view-standard-response';

export type CleanquoteacceptIdResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? CleaningViewStandardResponse
    : TContentType extends 'application/json'
    ? CleaningViewStandardResponse
    : TContentType extends 'text/json'
    ? CleaningViewStandardResponse
    : any
  : any;
