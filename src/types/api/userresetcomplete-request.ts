/* tslint:disable */
import { PasswordReset } from './password-reset';

export type UserresetcompleteRequest<
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
  ? PasswordReset
  : TCode extends 'application/json'
  ? PasswordReset
  : TCode extends 'text/json'
  ? PasswordReset
  : TCode extends 'application/*+json'
  ? PasswordReset
  : any;
