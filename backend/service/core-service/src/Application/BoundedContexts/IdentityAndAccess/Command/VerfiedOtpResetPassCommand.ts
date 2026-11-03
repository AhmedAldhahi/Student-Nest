import { ICommand } from "../../Shared/abstraction/ICommand";

export class VerifiedOtpResetPassCommand implements ICommand {
    public email :string;
    public otpCode: string;

    constructor(email: string, otp: string) {
        this.email = email;
        this.otpCode = otp;
    }
}