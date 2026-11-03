import { ICommand } from "../../Shared/abstraction/ICommand";

export class deleteAdminNotificationByIdCommand implements ICommand {
  public id: number;
  public userId: string;

  constructor(id: number, userId: string) {
    this.id = id;
    this.userId = userId;
  }
}
