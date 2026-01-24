import { PaymentStatus } from "../Enum/PaymentStatus.enum";
import { VerifiedLandlordStatus } from "../Enum/VerfiedLandlordStatus.enum";

export interface PaymentsResponse {
  paymentId: string;
  paymentStatus: PaymentStatus;
  amount: string;
  dueDate: string;
  leaseId: string;
  verifiedByLandlord?: VerifiedLandlordStatus | VerifiedLandlordStatus.Pending;
}
