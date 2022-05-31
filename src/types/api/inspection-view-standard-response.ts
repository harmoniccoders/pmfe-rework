/* tslint:disable */
import { InspectionView } from './inspection-view';

export interface InspectionViewStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: InspectionView;
  statusCode?: null | string;
  errors?: any;
}
