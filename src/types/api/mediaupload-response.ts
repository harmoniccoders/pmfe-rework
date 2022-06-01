/* tslint:disable */
import { MediaViewStandardResponse } from './media-view-standard-response';

export type MediauploadResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? MediaViewStandardResponse
    : TContentType extends 'application/json'
    ? MediaViewStandardResponse
    : TContentType extends 'text/json'
    ? MediaViewStandardResponse
    : any
  : any;
