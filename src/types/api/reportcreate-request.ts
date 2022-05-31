/* tslint:disable */
import { ReportModel } from './report-model';

export type ReportcreateRequest<
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
  ? ReportModel
  : TCode extends 'application/json'
  ? ReportModel
  : TCode extends 'text/json'
  ? ReportModel
  : TCode extends 'application/*+json'
  ? ReportModel
  : any;
