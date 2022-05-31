/* tslint:disable */
import { InspectionViewStandardResponse } from './inspection-view-standard-response';

export type PropertyinspectionsuserpropertyPropertyIdResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    ? InspectionViewStandardResponse
    : TContentType extends 'application/json'
    ? InspectionViewStandardResponse
    : TContentType extends 'text/json'
    ? InspectionViewStandardResponse
    : any
  : any;
