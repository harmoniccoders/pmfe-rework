/* tslint:disable */
import { PropertyRequestMatchViewStandardResponse } from './property-request-match-view-standard-response';

export type PropertyRequestmatchremoveMatchIdResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? PropertyRequestMatchViewStandardResponse
    : TContentType extends 'application/json'
    ? PropertyRequestMatchViewStandardResponse
    : TContentType extends 'text/json'
    ? PropertyRequestMatchViewStandardResponse
    : any
  : any;
