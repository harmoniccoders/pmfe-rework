/* tslint:disable */
import { PropertyModel } from './property-model';

export type PropertycreateRequest<
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
  ? PropertyModel
  : TCode extends 'application/json'
  ? PropertyModel
  : TCode extends 'text/json'
  ? PropertyModel
  : TCode extends 'application/*+json'
  ? PropertyModel
  : any;
