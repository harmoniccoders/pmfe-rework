/* tslint:disable */
export type PropertydeleteIdResponse<
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
