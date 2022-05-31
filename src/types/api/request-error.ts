/* tslint:disable */
import { SingleError } from './single-error';

export interface RequestError {
  errors?: null | Array<SingleError>;
  code?: number;
  message?: null | string;
  errorResponseContent?: null | string;
}
