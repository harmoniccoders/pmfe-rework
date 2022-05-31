/* tslint:disable */
import { NameModel } from './name-model';

export type ComplaintscategoriescreateRequest<
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
  ? NameModel
  : TCode extends 'application/json'
  ? NameModel
  : TCode extends 'text/json'
  ? NameModel
  : TCode extends 'application/*+json'
  ? NameModel
  : any;
