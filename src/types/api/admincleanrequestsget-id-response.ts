/* tslint:disable */
import { CleaningView } from './cleaning-view';

export type AdmincleanrequestsgetIdResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? CleaningView
    : TContentType extends 'application/json'
    ? CleaningView
    : TContentType extends 'text/json'
    ? CleaningView
    : any
  : any;
