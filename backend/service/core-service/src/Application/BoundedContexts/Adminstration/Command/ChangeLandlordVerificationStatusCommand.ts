import { ICommand } from "../../Shared/abstraction/ICommand";

export class ChangeLandlordVerificationStatusCommand implements ICommand {
  public userId: string;
  public Verified: boolean;

  constructor(userId: string, verified: boolean) {
    this.userId = userId;
    this.Verified = verified;
  }
}
