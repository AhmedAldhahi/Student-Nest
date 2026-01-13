import { LeaseRequestStatus } from "../../../../Domain/Shared/Enum/LeaseRequestStatus.enum";
import { ICommand } from "../../ICommand";

export class updateLeaseRequestCommand implements ICommand {
  public status: LeaseRequestStatus;
  public userId: string;
  public id: string;

  constructor(status: LeaseRequestStatus, userId: string, id: string) {
    this.status = status;
    this.userId = userId;
    this.id = id;
  }
}
