import { UserAccountStatus } from "../../../../Domain/Shared/Enum/UserAccountStatus.enum";
import { ICommand } from "../../ICommand";

export class UpdateUserActivateStatus implements ICommand {
  public data: UserAccountStatus;
  public id: string;

  constructor(status: UserAccountStatus, id: string) {
    this.data = status;
    this.id = id;
  }
}
