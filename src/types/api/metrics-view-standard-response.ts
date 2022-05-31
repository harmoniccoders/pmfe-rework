/* tslint:disable */
import { MetricsView } from './metrics-view';

export interface MetricsViewStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: MetricsView;
  statusCode?: null | string;
  errors?: any;
}
