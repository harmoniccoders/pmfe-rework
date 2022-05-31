/* tslint:disable */
import { CleaningView } from './cleaning-view';
import { RequestError } from './request-error';

export interface CleaningViewStandardResponse {
  data?: CleaningView;
  error?: RequestError;
}
