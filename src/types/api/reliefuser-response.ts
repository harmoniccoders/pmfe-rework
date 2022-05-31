/* tslint:disable */
import { RentReliefViewIEnumerableStandardResponse } from './rent-relief-view-i-enumerable-standard-response';

export type ReliefuserResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? RentReliefViewIEnumerableStandardResponse
    : TContentType extends 'application/json'
    ? RentReliefViewIEnumerableStandardResponse
    : TContentType extends 'text/json'
    ? RentReliefViewIEnumerableStandardResponse
    : any
  : any;
