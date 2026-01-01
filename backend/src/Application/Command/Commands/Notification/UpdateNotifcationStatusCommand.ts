import { ICommand } from "../../ICommand";

export class UpdateNotificationStatusCommand implements ICommand {
  public isRead: boolean;
  public id: number;
  constructor(isRead: boolean, id: number) {
    this.isRead = isRead;
    this.id = id;
  }
}
