import { PaymentAggregateRoot } from "../../../../Domain/BoundedContexts/Payment/AgregateRoot/Payment.AgregateRoot";
import { ICommand } from "../../Shared/abstraction/ICommand";
import { CreateLeaseRequest } from "../Dto/Request/CreateLeaseRequest";

export class CreateLeaseCommand implements ICommand {
  public userId: string;
  public leaseRequestId: string;

  constructor(data: CreateLeaseRequest, userId: string) {
    this.userId = userId;
    this.leaseRequestId = data.leaseRequestId;
  }
}
