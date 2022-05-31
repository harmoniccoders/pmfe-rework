/* tslint:disable */
import { ApplicationViewStandardResponse } from './application-view-standard-response';

export type ApplicationacceptIdResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? ApplicationViewStandardResponse
    : TContentType extends 'application/json'
    ? ApplicationViewStandardResponse
    : TContentType extends 'text/json'
    ? ApplicationViewStandardResponse
    : any
  : any;
