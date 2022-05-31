/* tslint:disable */
import { PropertyTitleIEnumerableStandardResponse } from './property-title-i-enumerable-standard-response';

export type PropertytitlesResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? PropertyTitleIEnumerableStandardResponse
    : TContentType extends 'application/json'
    ? PropertyTitleIEnumerableStandardResponse
    : TContentType extends 'text/json'
    ? PropertyTitleIEnumerableStandardResponse
    : any
  : any;
