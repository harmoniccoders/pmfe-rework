/* tslint:disable */
import { CleaningModel } from './cleaning-model';

export type CleanrequestRequest<
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
  ? CleaningModel
  : TCode extends 'application/json'
  ? CleaningModel
  : TCode extends 'text/json'
  ? CleaningModel
  : TCode extends 'application/*+json'
  ? CleaningModel
  : any;
