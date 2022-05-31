/* tslint:disable */
import { LandSearchView } from './land-search-view';
import { RequestError } from './request-error';

export interface LandSearchViewStandardResponse {
  data?: LandSearchView;
  error?: RequestError;
}
