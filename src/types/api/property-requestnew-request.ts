/* tslint:disable */
import { PropertyRequestInput } from './property-request-input';

export type PropertyRequestnewRequest<
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
  ? PropertyRequestInput
  : TCode extends 'application/json'
  ? PropertyRequestInput
  : TCode extends 'text/json'
  ? PropertyRequestInput
  : TCode extends 'application/*+json'
  ? PropertyRequestInput
  : any;
