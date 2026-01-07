import { PaymentStatus } from "../../../Domain/Shared/Enum/PaymentStatus.enum";

export interface PaymentsResponse {
  paymentId: string;
  paymentStatus: PaymentStatus;
  amount: string;
  dueDate: string;
  leaseId: string;
}
