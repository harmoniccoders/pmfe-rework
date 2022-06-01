/* tslint:disable */
import { LandSearchView } from './land-search-view';
import { Link } from './link';

export interface LandSearchViewPagedCollection {
  offset?: null | number;
  limit?: null | number;
  size?: number;
  first?: Link;
  previous?: Link;
  next?: Link;
  last?: Link;
  self?: Link;
  value?: null | Array<LandSearchView>;
}
