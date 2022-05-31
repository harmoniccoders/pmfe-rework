/* tslint:disable */
import { CleaningView } from './cleaning-view';
import { Link } from './link';

export interface CleaningViewPagedCollection {
  offset?: null | number;
  limit?: null | number;
  size?: number;
  first?: Link;
  previous?: Link;
  next?: Link;
  last?: Link;
  self?: Link;
  value?: null | Array<CleaningView>;
}
