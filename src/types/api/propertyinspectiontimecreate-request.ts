/* tslint:disable */
import { InspectionTimeModel } from './inspection-time-model';

export type PropertyinspectiontimecreateRequest<
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
  ? InspectionTimeModel
  : TCode extends 'application/json'
  ? InspectionTimeModel
  : TCode extends 'text/json'
  ? InspectionTimeModel
  : TCode extends 'application/*+json'
  ? InspectionTimeModel
  : any;
