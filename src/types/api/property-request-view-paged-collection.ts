/* tslint:disable */
import { Link } from './link';
import { PropertyRequestView } from './property-request-view';

export interface PropertyRequestViewPagedCollection {
  offset?: null | number;
  limit?: null | number;
  size?: number;
  first?: Link;
  previous?: Link;
  next?: Link;
  last?: Link;
  self?: Link;
  value?: null | Array<PropertyRequestView>;
}
