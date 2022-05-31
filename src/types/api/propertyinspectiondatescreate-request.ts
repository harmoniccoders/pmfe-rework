/* tslint:disable */
import { InspectionDateModel } from './inspection-date-model';

export type PropertyinspectiondatescreateRequest<
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
  ? InspectionDateModel
  : TCode extends 'application/json'
  ? InspectionDateModel
  : TCode extends 'text/json'
  ? InspectionDateModel
  : TCode extends 'application/*+json'
  ? InspectionDateModel
  : any;
