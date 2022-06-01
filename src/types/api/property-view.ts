/* tslint:disable */
import { MediaView } from './media-view';
import { User } from './user';
import { UserView } from './user-view';

export interface PropertyView {
  id?: number;
  name?: null | string;
  title?: null | string;
  address?: null | string;
  description?: null | string;
  sellMyself?: boolean;
  price?: number;
  numberOfBedrooms?: number;
  numberOfBathrooms?: number;
  isDraft?: boolean;
  isActive?: boolean;
  rejectionReason?: null | string;
  isForRent?: boolean;
  isForSale?: boolean;
  area?: null | string;
  propertyType?: null | string;
  createdByUser?: UserView;
  mediaFiles?: null | Array<MediaView>;
  verified?: boolean;
  representative?: User;
  state?: null | string;
  lga?: null | string;
  isRequest?: boolean;
  status?: null | string;
  longitude?: number;
  latitude?: number;
  views?: number;
  enquiries?: number;
  dateCreated?: string;
  propertyTypeId?: number;
}
