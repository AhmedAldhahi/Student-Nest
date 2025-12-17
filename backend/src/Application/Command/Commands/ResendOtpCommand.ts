import { ICommand } from "../ICommand";

export class ResendOtpCommand implements ICommand {
  public email: string;
  constructor(email: string) {
    this.email = email;
  }
}
