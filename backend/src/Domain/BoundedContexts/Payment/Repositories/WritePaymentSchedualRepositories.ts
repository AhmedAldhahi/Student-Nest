import { PaymentAggregateRoot } from "../AgregateRoot/Payment.AgregateRoot";

export interface IWritePaymentScheduleRepo {
  updatePaymentSchedule(domain: PaymentAggregateRoot): Promise<void>;
}
