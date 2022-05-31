/* tslint:disable */
import { Link } from './link';
import { PropertyView } from './property-view';

export interface PropertyViewPagedCollection {
  offset?: null | number;
  limit?: null | number;
  size?: number;
  first?: Link;
  previous?: Link;
  next?: Link;
  last?: Link;
  self?: Link;
  value?: null | Array<PropertyView>;
}
