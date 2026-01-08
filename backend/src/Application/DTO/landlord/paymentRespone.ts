import { PaymentStatus } from "../../../Domain/Shared/Enum/PaymentStatus.enum";
import { VerifiedLandlordStatus } from "../../../Domain/Shared/Enum/VerfiedLandlordStatus.enum";

export interface PaymentsResponse {
  paymentId: string;
  paymentStatus: PaymentStatus;
  amount: string;
  dueDate: string;
  leaseId: string;
  verifiedByLandlord: VerifiedLandlordStatus
}
