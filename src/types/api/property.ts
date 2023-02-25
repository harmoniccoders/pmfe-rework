/* tslint:disable */
import { Inspections } from './inspections';
import { Media } from './media';
import { PropertyType } from './property-type';
import { RentCollectionType } from './rent-collection-type';
import { Report } from './report';
import { Status } from './status';
import { TenantType } from './tenant-type';
import { User } from './user';
import { UserEnquiry } from './user-enquiry';

export interface Property {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  name: string;
  title: string;
  address: string;
  description: string;
  state: string;
  lga: string;
  sellMyself?: boolean;
  price?: number;
  formattedPrice?: null | string;
  numberOfBedrooms?: number;
  numberOfBathrooms?: number;
  isDraft?: boolean;
  isActive?: boolean;
  isForRent?: boolean;
  isForSale?: boolean;
  area?: null | string;
  verified?: boolean;
  representativeId?: null | number;
  representative?: User;
  propertyTypeId?: number;
  propertyType?: PropertyType;
  createdByUserId?: number;
  createdByUser?: User;
  mediaFiles?: null | Array<Media>;
  isRequest?: boolean;
  statusId?: null | number;
  status?: Status;
  reports?: null | Array<Report>;
  views?: number;
  enquiries?: number;
  longitude?: number;
  latitude?: number;
  rejectionReason?: null | string;
  userEnquiries?: null | Array<UserEnquiry>;
  tenantTypeId?: null | number;
  tenantType?: TenantType;
  rentCollectionType?: RentCollectionType;
  rentCollectionTypeId?: null | number;
  inspections?: null | Array<Inspections>;
  documentUrl?: null | string;
}
