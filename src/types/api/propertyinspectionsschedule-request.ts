/* tslint:disable */
import { InspectionModel } from './inspection-model';

export type PropertyinspectionsscheduleRequest<
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
  ? InspectionModel
  : TCode extends 'application/json'
  ? InspectionModel
  : TCode extends 'text/json'
  ? InspectionModel
  : TCode extends 'application/*+json'
  ? InspectionModel
  : any;
