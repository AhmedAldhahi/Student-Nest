import { ReceiptEntity } from "../Entities/ReceiptEntities.entity";
import { PaymentAmount } from "../Value-Object/PaymentAmount.vo";

export interface PaymentData {
  paymentId: string;
  paymentStatus: boolean;
  amount: PaymentAmount;
  dueDate: string;
  leaseId: string;
  paymentReceipt?: ReceiptEntity[];
}
