import { ICommand } from "../../ICommand";

export class EditLandlordVerificationStatus implements ICommand {
  public userId: string;
  public Verified: boolean;

  constructor(userId: string, verified: boolean) {
    this.userId = userId;
    this.Verified = verified;
  }
}
