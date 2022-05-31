/* tslint:disable */
import { Link } from './link';
import { UserView } from './user-view';

export interface UserViewPagedCollection {
  offset?: null | number;
  limit?: null | number;
  size?: number;
  first?: Link;
  previous?: Link;
  next?: Link;
  last?: Link;
  self?: Link;
  value?: null | Array<UserView>;
}
