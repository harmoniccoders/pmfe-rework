/* tslint:disable */
import { TransactionPagedCollection } from './transaction-paged-collection';

export interface TransactionPagedCollectionStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: TransactionPagedCollection;
  statusCode?: null | string;
  errors?: any;
}
