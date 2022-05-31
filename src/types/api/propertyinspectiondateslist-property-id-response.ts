/* tslint:disable */
import { InspectionDateViewIEnumerableStandardResponse } from './inspection-date-view-i-enumerable-standard-response';

export type PropertyinspectiondateslistPropertyIdResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? InspectionDateViewIEnumerableStandardResponse
    : TContentType extends 'application/json'
    ? InspectionDateViewIEnumerableStandardResponse
    : TContentType extends 'text/json'
    ? InspectionDateViewIEnumerableStandardResponse
    : any
  : any;
