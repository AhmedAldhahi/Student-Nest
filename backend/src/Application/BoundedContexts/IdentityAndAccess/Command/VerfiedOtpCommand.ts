import { ICommand } from "../../Shared/abstraction/ICommand";

export class VerifiedOtpCommand implements ICommand {
  public otpCode: string;
  public email: string;

  constructor(otp: string, email: string) {
    this.otpCode = otp;
    this.email = email;
  }
}
