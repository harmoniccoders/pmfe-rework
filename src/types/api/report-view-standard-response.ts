/* tslint:disable */
import { ReportView } from './report-view';

export interface ReportViewStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: ReportView;
  statusCode?: null | string;
  errors?: any;
}
