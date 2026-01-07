import { PaymentStatus } from "../../../../Domain/Shared/Enum/PaymentStatus.enum";
import { ICommand } from "../../ICommand";

export class EditStatusOfPaymentCommand implements ICommand {
  public userId: string;
  public leaseId: string;
  public paymentId: string;
  public status: PaymentStatus;

  constructor(
    userId: string,
    leaseId: string,
    paymentId: string,
    status: PaymentStatus
  ) {
    this.userId = userId;
    this.leaseId = leaseId;
    this.paymentId = paymentId;
    this.status = status;
  }
}
