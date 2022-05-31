/* tslint:disable */
import { ComplaintsModel } from './complaints-model';

export type ComplaintscreateRequest<
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
  ? ComplaintsModel
  : TCode extends 'application/json'
  ? ComplaintsModel
  : TCode extends 'text/json'
  ? ComplaintsModel
  : TCode extends 'application/*+json'
  ? ComplaintsModel
  : any;
