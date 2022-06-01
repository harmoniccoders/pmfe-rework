/* tslint:disable */
import { ApplicationModel } from './application-model';

export type ApplicationnewRequest<
  TCode extends
    | 'application/json-patch+json'
    | 'application/json'
    | 'text/json'
    | 'application/*+json' =
    | 'application/json-patch+json'
    | 'application/json'
    | 'text/json'
    | 'application/*+json'
> = TCode extends 'application/json-patch+json'
  ? ApplicationModel
  : TCode extends 'application/json'
  ? ApplicationModel
  : TCode extends 'text/json'
  ? ApplicationModel
  : TCode extends 'application/*+json'
  ? ApplicationModel
  : any;
