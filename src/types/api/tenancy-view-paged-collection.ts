/* tslint:disable */
import { Link } from './link';
import { TenancyView } from './tenancy-view';

export interface TenancyViewPagedCollection {
  offset?: null | number;
  limit?: null | number;
  size?: number;
  first?: Link;
  previous?: Link;
  next?: Link;
  last?: Link;
  self?: Link;
  value?: null | Array<TenancyView>;
}
