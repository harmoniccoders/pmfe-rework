/* tslint:disable */
import { UpdateUserModel } from './update-user-model';

export type UserupdateRequest<
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
  ? UpdateUserModel
  : TCode extends 'application/json'
  ? UpdateUserModel
  : TCode extends 'text/json'
  ? UpdateUserModel
  : TCode extends 'application/*+json'
  ? UpdateUserModel
  : any;
