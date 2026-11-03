import { ICommand } from "../../Shared/abstraction/ICommand";

export class ResendOtpForgetPassCommand implements ICommand {
  public email: string;

  constructor(email: string) {
    this.email = email;
  }
}
