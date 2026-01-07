import { PaymentStatus } from "../../../Shared/Enum/PaymentStatus.enum";
import { ReceiptEntity } from "../Entities/ReceiptEntities.entity";
import { PaymentAmount } from "../Value-Object/PaymentAmount.vo";

export interface PaymentData {
  paymentId: string;
  paymentStatus: PaymentStatus;
  amount: PaymentAmount;
  dueDate: string;
  leaseId: string;
  paymentReceipt?: ReceiptEntity[];
}
