import { PaymentsResponse } from "../../../../Application/DTO/landlord/paymentRespone";
import { PaymentAggregateRoot } from "../AgregateRoot/Payment.AgregateRoot";

export interface IReadPaymentScheduleRepo {
  FindAllPaymentScheduleForOneLease(
    userId: string,
    leaseId: string
  ): Promise<PaymentsResponse[] | null>;

  FindAllPaymentAsArray(
    userId: string,
    leaseId: string,
    paymentId: string[]
  ): Promise<PaymentsResponse[] | null>;

  FindPaymentScheduleById(
    userId: string,
    leaseId: string,
    paymentId: string
  ): Promise<PaymentAggregateRoot | null>;
}
