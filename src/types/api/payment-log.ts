/* tslint:disable */
import { Card } from './card';

export interface PaymentLog {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  flutterWavePaymentId?: number;
  transactionReference?: null | string;
  flutterWaveReference?: null | string;
  deviceFingerPrint?: null | string;
  amount?: null | string;
  currency?: null | string;
  chargedAmount?: null | string;
  appFee?: null | string;
  merchantFee?: null | string;
  processorResponse?: null | string;
  authModel?: null | string;
  ip?: null | string;
  narration?: null | string;
  status?: null | string;
  paymentType?: null | string;
  accountId?: number;
  amountSettled?: number;
  createdAt?: string;
  cardId?: number;
  card?: Card;
}
