import { PaymentsResponse } from "../../../../Application/DTO/landlord/paymentRespone";

export interface IReadPaymentScheduleRepo {
  FindAllPaymentScheduleForOneLease(
    userId: string,
    leaseId: string
  ): Promise<PaymentsResponse[] | null>;
}
