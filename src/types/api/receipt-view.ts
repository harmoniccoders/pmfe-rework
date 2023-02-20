/* tslint:disable */
import { PaymentLog } from './payment-log';
import { PropertyView } from './property-view';

export interface ReceiptView {
  fullName?: null | string;
  phoneNumber?: null | string;
  email?: null | string;
  property?: PropertyView;
  paymentLog?: PaymentLog;
  paymentDate?: string;
  amount?: null | string;
}
