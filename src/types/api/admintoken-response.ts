/* tslint:disable */
import { UserViewStandardResponse } from './user-view-standard-response';

export type AdmintokenResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? UserViewStandardResponse
    : TContentType extends 'application/json'
    ? UserViewStandardResponse
    : TContentType extends 'text/json'
    ? UserViewStandardResponse
    : any
  : any;
