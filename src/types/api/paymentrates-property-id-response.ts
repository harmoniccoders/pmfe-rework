/* tslint:disable */
import { PaymentRatesViewStandardResponse } from './payment-rates-view-standard-response';

export type PaymentratesPropertyIdResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? PaymentRatesViewStandardResponse
    : TContentType extends 'application/json'
    ? PaymentRatesViewStandardResponse
    : TContentType extends 'text/json'
    ? PaymentRatesViewStandardResponse
    : any
  : any;
