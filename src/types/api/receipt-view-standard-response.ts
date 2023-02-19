/* tslint:disable */
import { ReceiptView } from './receipt-view';

export interface ReceiptViewStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: ReceiptView;
  statusCode?: null | string;
  errors?: any;
}
