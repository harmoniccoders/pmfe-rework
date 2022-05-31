/* tslint:disable */
import { PropertyViewStandardResponse } from './property-view-standard-response';

export type PropertyusercreatedrentResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? PropertyViewStandardResponse
    : TContentType extends 'application/json'
    ? PropertyViewStandardResponse
    : TContentType extends 'text/json'
    ? PropertyViewStandardResponse
    : any
  : any;
