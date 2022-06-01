/* tslint:disable */
import { MediaModel } from './media-model';

export interface PropertyModel {
  id?: number;
  name: string;
  title: string;
  address: string;
  description: string;
  sellMyself?: boolean;
  price: number;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  isDraft?: boolean;
  isActive?: boolean;
  isForRent?: boolean;
  isForSale?: boolean;
  propertyTypeId: number;
  mediaFiles?: null | Array<MediaModel>;
  state?: null | string;
  lga?: null | string;
  area?: null | string;
  isRequest?: boolean;
  comment?: null | string;
  budget?: null | string;
  longitude?: number;
  latitude?: number;
  propertyRequestId?: number;
  tenantTypeId?: number;
  rentCollectionTypeId?: number;
  requestId?: number;
  bank?: null | string;
  accountNumber?: null | string;
  propertyRequestMatchId?: number;
}
