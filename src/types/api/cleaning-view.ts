/* tslint:disable */
import { CleaningQuoteView } from './cleaning-quote-view';
import { LeanUserView } from './lean-user-view';

export interface CleaningView {
  id?: number;
  buildingState?: null | string;
  propertyTypeId?: number;
  propertyType?: null | string;
  dateNeeded?: string;
  numberOfBathrooms?: number;
  numberOfBedrooms?: number;
  numberOfFloors?: number;
  buildingType?: null | string;
  fileName?: null | string;
  fileNumber?: null | string;
  status?: null | string;
  dateCreated?: string;
  userId?: number;
  user?: LeanUserView;
  cleaningQuote?: null | Array<CleaningQuoteView>;
}
