/* tslint:disable */
import { LandSearchViewPagedCollection } from './land-search-view-paged-collection';
import { RequestError } from './request-error';

export interface LandSearchViewPagedCollectionStandardResponse {
  data?: LandSearchViewPagedCollection;
  error?: RequestError;
}
