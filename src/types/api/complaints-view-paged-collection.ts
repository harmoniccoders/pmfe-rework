/* tslint:disable */
import { ComplaintsView } from './complaints-view';
import { Link } from './link';

export interface ComplaintsViewPagedCollection {
  offset?: null | number;
  limit?: null | number;
  size?: number;
  first?: Link;
  previous?: Link;
  next?: Link;
  last?: Link;
  self?: Link;
  value?: null | Array<ComplaintsView>;
}
