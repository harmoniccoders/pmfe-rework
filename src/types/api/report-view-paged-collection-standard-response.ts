/* tslint:disable */
import { ReportViewPagedCollection } from './report-view-paged-collection';

export interface ReportViewPagedCollectionStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: ReportViewPagedCollection;
  statusCode?: null | string;
  errors?: any;
}
