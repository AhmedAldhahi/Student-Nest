import { VerifiedLandlordStatus } from "../../../../Domain/BoundedContexts/Payment/Enum/VerfiedLandlordStatus.enum";
import { ICommand } from "../../Shared/abstraction/ICommand";

export class ChangeStatusOfPaymentCommand implements ICommand {
  public userId: string;
  public leaseId: string;
  public paymentId: string;
  public status: VerifiedLandlordStatus;

  constructor(
    userId: string,
    leaseId: string,
    paymentId: string,
    status: VerifiedLandlordStatus
  ) {
    this.userId = userId;
    this.leaseId = leaseId;
    this.paymentId = paymentId;
    this.status = status;
  }
}
