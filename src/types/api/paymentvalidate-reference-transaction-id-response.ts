/* tslint:disable */
import { PaymentViewStandardResponse } from './payment-view-standard-response';

export type PaymentvalidateReferenceTransactionIdResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? PaymentViewStandardResponse
    : TContentType extends 'application/json'
    ? PaymentViewStandardResponse
    : TContentType extends 'text/json'
    ? PaymentViewStandardResponse
    : any
  : any;
