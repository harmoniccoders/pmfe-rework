/* tslint:disable */
import { TransactionPagedCollectionStandardResponse } from './transaction-paged-collection-standard-response';

export type AdmintransactionslistResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? TransactionPagedCollectionStandardResponse
    : TContentType extends 'application/json'
    ? TransactionPagedCollectionStandardResponse
    : TContentType extends 'text/json'
    ? TransactionPagedCollectionStandardResponse
    : any
  : any;
