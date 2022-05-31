/* tslint:disable */
import { PasswordResetModel } from './password-reset-model';

export type UserpasswordupdateRequest<
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
  ? PasswordResetModel
  : TCode extends 'application/json'
  ? PasswordResetModel
  : TCode extends 'text/json'
  ? PasswordResetModel
  : TCode extends 'application/*+json'
  ? PasswordResetModel
  : any;
