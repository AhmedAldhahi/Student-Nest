import { PaymentAggregateRoot } from "../AgregateRoot/Payment.AgregateRoot";
import { PaymentStatus } from "../Enum/PaymentStatus.enum";
import { VerifiedLandlordStatus } from "../Enum/VerfiedLandlordStatus.enum";

export interface PaymentsResponse {
  paymentId: string;
  paymentStatus: PaymentStatus;
  amount: string;
  dueDate: string;
  leaseId: string;
  verifiedByLandlord?: VerifiedLandlordStatus
}


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
