/* tslint:disable */
/**
 * Model of parameters for API `/api/Property/list/rent`
 */
export interface PropertylistrentParameters {
  Offset?: null | number;
  Limit?: null | number;
  search?: null | string;
  Residential?: null | boolean;
  Commercial?: null | boolean;
  Mixed?: null | boolean;
  Bungalow?: null | boolean;
  Flat?: null | boolean;
  Duplex?: null | boolean;
  Terrace?: null | boolean;
  Bathrooms?: null | number;
  Bedrooms?: null | number;
}
