/* tslint:disable */
import { ApplicationStatusViewStandardResponse } from './application-status-view-standard-response';

export type ApplicationgetuserpropertyPropertyIdResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? ApplicationStatusViewStandardResponse
    : TContentType extends 'application/json'
    ? ApplicationStatusViewStandardResponse
    : TContentType extends 'text/json'
    ? ApplicationStatusViewStandardResponse
    : any
  : any;
