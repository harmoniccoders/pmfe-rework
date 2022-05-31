/* tslint:disable */
import { LoginModel } from './login-model';

export type UsertokenRequest<
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
  ? LoginModel
  : TCode extends 'application/json'
  ? LoginModel
  : TCode extends 'text/json'
  ? LoginModel
  : TCode extends 'application/*+json'
  ? LoginModel
  : any;
