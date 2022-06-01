/* tslint:disable */
export type UserregisterResponse<
  TCode extends 200 = 200,
  TContentType extends 'application/json' = 'application/json'
> = TCode extends 200
  ? TContentType extends 'application/json'
    /**
     * Success
     */
    ? null
    : any
  : any;
