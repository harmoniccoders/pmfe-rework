/* tslint:disable */
import { Register } from './register';

export type UserregisterRequest<
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
  ? Register
  : TCode extends 'application/json'
  ? Register
  : TCode extends 'text/json'
  ? Register
  : TCode extends 'application/*+json'
  ? Register
  : any;
