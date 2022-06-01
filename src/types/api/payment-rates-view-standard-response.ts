/* tslint:disable */
import { PaymentRatesView } from './payment-rates-view';

export interface PaymentRatesViewStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: PaymentRatesView;
  statusCode?: null | string;
  errors?: any;
}
