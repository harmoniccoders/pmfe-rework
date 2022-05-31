/* tslint:disable */
import { InspectionDateView } from './inspection-date-view';

export interface InspectionDateViewStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: InspectionDateView;
  statusCode?: null | string;
  errors?: any;
}
