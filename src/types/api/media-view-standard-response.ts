/* tslint:disable */
import { MediaView } from './media-view';

export interface MediaViewStandardResponse {
  href?: null | string;
  relations?: null | Array<string>;
  method?: null | string;
  routeName?: null | string;
  routeValues?: any;
  status?: boolean;
  message?: null | string;
  data?: MediaView;
  statusCode?: null | string;
  errors?: any;
}
