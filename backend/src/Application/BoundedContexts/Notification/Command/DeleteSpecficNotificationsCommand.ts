import { ICommand } from "../../Shared/abstraction/ICommand";

export class deleteSpecificNotificationsCommand implements ICommand{
  public ids: number[];
  public userId: string;

  constructor(ids: number[], userId: string) {
    this.ids = ids;
    this.userId = userId;
  }
}
