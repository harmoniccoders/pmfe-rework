/* tslint:disable */
import { PaymentModel } from './payment-model';

export type PaymentinitiateRequest<
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
  ? PaymentModel
  : TCode extends 'application/json'
  ? PaymentModel
  : TCode extends 'text/json'
  ? PaymentModel
  : TCode extends 'application/*+json'
  ? PaymentModel
  : any;
