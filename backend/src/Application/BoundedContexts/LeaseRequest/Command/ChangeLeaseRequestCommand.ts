import { LeaseRequestStatus } from "../../../../Domain/BoundedContexts/Leases/Enum/LeaseRequestStatus.enum";
import { ICommand } from "../../Shared/abstraction/ICommand";

export class ChangeLeaseRequestCommand implements ICommand {
  public status: LeaseRequestStatus;
  public userId: string;
  public id: string;

  constructor(status: LeaseRequestStatus, userId: string, id: string) {
    this.status = status;
    this.userId = userId;
    this.id = id;
  }
}
