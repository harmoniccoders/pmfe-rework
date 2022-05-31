/* tslint:disable */
import { Property } from './property';
import { Tenancy } from './tenancy';

export interface Media {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  name: string;
  extention: string;
  url: string;
  base64String?: null | string;
  propertyId?: null | number;
  tenancyId?: null | number;
  tenancy?: Tenancy;
  isImage?: boolean;
  isVideo?: boolean;
  isDocument?: boolean;
  property?: Property;
}
