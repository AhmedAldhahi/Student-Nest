import { IReadUserRepositories } from "../../../Domain/Repositories/Read/ReadUserRepositories.repositories";
import { IUnitOfWork } from "../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { VerifiedOtpCommand } from "../Commands/VerfiedOtpCommand";
import { ICommandHandlers } from "../ICommandHandlers";

export class VerifiedOtpCommandHandler
  implements ICommandHandlers<VerifiedOtpCommand>
{
  constructor(
    private uow: IUnitOfWork,
    private readUserRepo: IReadUserRepositories
  ) {}

  public async handle(command: VerifiedOtpCommand): Promise<any> {
    try {
      const user = await this.readUserRepo.findByEmail(command.email);
      if (!user) throw new Error("No user found for this email.");

      // Check if already verified
      if (user.getVerifiedEmail()) {
        throw new Error("User already verified.");
      }

      console.log(user.getVerifiedEmail());

      // Get OTP and expiration
      const otp = user.getOtpForEmail();
      const otpExpired = user.getOtpExpiredForEmail(); 

      console.log(otpExpired);

      

      if (!otp || !otpExpired) throw new Error("OTP not sent for this email.");
      if (new Date() > otpExpired)
        throw new Error("OTP expired. Request a new one.");
      if (otp !== command.otpCode) throw new Error("Invalid OTP code.");

      user.verifiedEmail();

      user.clearEmailOTP();

      await this.uow.startTransaction();
      await this.uow.writeUserRepo.updateUser(user); // save updated user
      await this.uow.commitTransaction(); 

      return user;
    } catch (error: any) {
      console.error("fail to verified otp ");
      throw error;
    } finally {
        this.uow.releaseTransaction();
    }
  }
}
