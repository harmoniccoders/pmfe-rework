/* tslint:disable */
import { InspectionDateViewStandardResponse } from './inspection-date-view-standard-response';

export type PropertyinspectiondatescreateResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? InspectionDateViewStandardResponse
    : TContentType extends 'application/json'
    ? InspectionDateViewStandardResponse
    : TContentType extends 'text/json'
    ? InspectionDateViewStandardResponse
    : any
  : any;
