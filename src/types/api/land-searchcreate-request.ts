/* tslint:disable */
import { LandSearchModel } from './land-search-model';

export type LandSearchcreateRequest<
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
  ? LandSearchModel
  : TCode extends 'application/json'
  ? LandSearchModel
  : TCode extends 'text/json'
  ? LandSearchModel
  : TCode extends 'application/*+json'
  ? LandSearchModel
  : any;
