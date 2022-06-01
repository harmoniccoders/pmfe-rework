/* tslint:disable */
import { Link } from './link';
import { RequestView } from './request-view';

export interface RequestViewPagedCollection {
  offset?: null | number;
  limit?: null | number;
  size?: number;
  first?: Link;
  previous?: Link;
  next?: Link;
  last?: Link;
  self?: Link;
  value?: null | Array<RequestView>;
}
