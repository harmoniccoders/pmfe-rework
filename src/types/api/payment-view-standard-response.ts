/* tslint:disable */
import { PaymentView } from './payment-view';

export interface PaymentViewStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: PaymentView;
  statusCode?: null | string;
  errors?: any;
}
