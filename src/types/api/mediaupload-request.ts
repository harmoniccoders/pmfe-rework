/* tslint:disable */
import { MediaModel } from './media-model';

export type MediauploadRequest<
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
  ? MediaModel
  : TCode extends 'application/json'
  ? MediaModel
  : TCode extends 'text/json'
  ? MediaModel
  : TCode extends 'application/*+json'
  ? MediaModel
  : any;
