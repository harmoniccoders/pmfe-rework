/* tslint:disable */
import { LandSearchViewStandardResponse } from './land-search-view-standard-response';

export type LandSearchcreateResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? LandSearchViewStandardResponse
    : TContentType extends 'application/json'
    ? LandSearchViewStandardResponse
    : TContentType extends 'text/json'
    ? LandSearchViewStandardResponse
    : any
  : any;
