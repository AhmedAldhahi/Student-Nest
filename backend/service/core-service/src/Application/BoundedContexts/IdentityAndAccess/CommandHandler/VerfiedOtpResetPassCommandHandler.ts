import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { VerifiedOtpResetPassCommand } from "../Command/VerfiedOtpResetPassCommand";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { ResendOtpResponse } from "../Dto/Response/ResendOtpResponse";

export class VerifiedOTPForgetPassCommandHandler
  implements ICommandHandlers<VerifiedOtpResetPassCommand>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readUserRepo: IReadUserRepositories
  ) {}

  public async handle(
    command: VerifiedOtpResetPassCommand
  ): Promise<ResendOtpResponse> {
    try {
      const user = await this.readUserRepo.findByEmail(command.email);

      if (!user) throw new Error("No user found for this email.");

      // Check if already verified
      if (user.getVerifiedResetPassword()) {
        throw new Error("User already verified.");
      }


      // Get OTP and expiration
      const otp = user.getOTPForResetPassword();
      const otpExpired = user.getOTPExpiredDateForResetPassword();

      if (!otp || !otpExpired) throw new Error("OTP not sent for this email.");
      if (new Date() > otpExpired)
        throw new Error("OTP expired. Request a new one.");
      if (otp !== command.otpCode) throw new Error("Invalid OTP code.");

      // Mark as verified and clear OTP
      user.verifyResetPassword();
      user.verifiedEmail();

      user.clearResetPasswordOTP();

      await this.uow.startTransaction();
      await this.uow.writeUserRepo.updateUser(user);
      await this.uow.commitTransaction();

      return {
        message: "OTP verified successfully, update your password now ",
      };
    } catch (err) {
      await this.uow.rollbackTransaction();
      console.error("OTP verification failed:", err);
      if (err instanceof Error) throw err;
      throw new Error("Failed to verify OTP. Please try again.");
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
