/* tslint:disable */
import { MetricsViewStandardResponse } from './metrics-view-standard-response';

export type AdminmetricsResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? MetricsViewStandardResponse
    : TContentType extends 'application/json'
    ? MetricsViewStandardResponse
    : TContentType extends 'text/json'
    ? MetricsViewStandardResponse
    : any
  : any;
