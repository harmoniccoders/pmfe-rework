/* tslint:disable */
import { CleaningQuoteModel } from './cleaning-quote-model';

export type AdmincleanquoteRequest<
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
  ? CleaningQuoteModel
  : TCode extends 'application/json'
  ? CleaningQuoteModel
  : TCode extends 'text/json'
  ? CleaningQuoteModel
  : TCode extends 'application/*+json'
  ? CleaningQuoteModel
  : any;
