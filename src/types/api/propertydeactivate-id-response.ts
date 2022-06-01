/* tslint:disable */
import { BooleanStandardResponse } from './boolean-standard-response';

export type PropertydeactivateIdResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? BooleanStandardResponse
    : TContentType extends 'application/json'
    ? BooleanStandardResponse
    : TContentType extends 'text/json'
    ? BooleanStandardResponse
    : any
  : any;
