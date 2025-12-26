import { ICommand } from "../ICommand";

export class DeleteAllNotificationCommand implements ICommand {
  public userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
}
