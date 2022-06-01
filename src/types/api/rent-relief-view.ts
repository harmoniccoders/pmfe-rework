/* tslint:disable */
import { InstallmentView } from './installment-view';
import { PropertyView } from './property-view';
import { UserView } from './user-view';

export interface RentReliefView {
  id?: number;
  propertyId?: number;
  property?: PropertyView;
  user?: UserView;
  installments?: null | Array<InstallmentView>;
  status?: null | string;
  interest?: number;
  monthlyInstallment?: number;
  totalRepayment?: number;
  reliefAmount?: number;
}
