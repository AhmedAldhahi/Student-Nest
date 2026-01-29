import { ICommand } from "../../Shared/abstraction/ICommand";

export class DeleteUserCommand implements ICommand {
  public userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
}
