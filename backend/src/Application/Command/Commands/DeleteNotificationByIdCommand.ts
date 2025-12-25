import { ICommand } from "../ICommand";

export class deleteNotificationByIdCommand implements ICommand {
  public id: number;
  public userId: string;
  constructor(id: number, userId: string) {
    this.id = id;
    this.userId = userId;
  }
}
