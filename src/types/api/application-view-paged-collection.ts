/* tslint:disable */
import { ApplicationView } from './application-view';
import { Link } from './link';

export interface ApplicationViewPagedCollection {
  offset?: null | number;
  limit?: null | number;
  size?: number;
  first?: Link;
  previous?: Link;
  next?: Link;
  last?: Link;
  self?: Link;
  value?: null | Array<ApplicationView>;
}
