/* tslint:disable */
import { Link } from './link';
import { ReportView } from './report-view';

export interface ReportViewPagedCollection {
  offset?: null | number;
  limit?: null | number;
  size?: number;
  first?: Link;
  previous?: Link;
  next?: Link;
  last?: Link;
  self?: Link;
  value?: null | Array<ReportView>;
}
