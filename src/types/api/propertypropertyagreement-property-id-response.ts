/* tslint:disable */
import { StringStandardResponse } from './string-standard-response';

export type PropertypropertyagreementPropertyIdResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? StringStandardResponse
    : TContentType extends 'application/json'
    ? StringStandardResponse
    : TContentType extends 'text/json'
    ? StringStandardResponse
    : any
  : any;
