import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import {
  ITokenPayload,
  ITokenService,
} from "../../../Interfaces/IToken.interface";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { VerifiedOtpCommand } from "../Command/VerfiedOtpCommand";

export class VerifiedOtpCommandHandler
  implements ICommandHandlers<VerifiedOtpCommand>
{
  constructor(
    private uow: IUnitOfWork,
    private readUserRepo: IReadUserRepositories,
    private readonly tokenService: ITokenService
  ) {}

  public async handle(command: VerifiedOtpCommand): Promise<any> {
    try {
      const user = await this.readUserRepo.findByEmail(command.email);
      if (!user) throw new Error("No user found for this email.");

      if (user.getVerifiedEmail()) {
        throw new Error("User already verified.");
      }


      const otp = user.getOtpForEmail();
      const otpExpired = user.getOtpExpiredForEmail();


      if (!otp || !otpExpired) throw new Error("OTP not sent for this email.");
      if (new Date() > otpExpired)
        throw new Error("OTP expired. Request a new one.");
      if (otp !== command.otpCode) throw new Error("Invalid OTP code.");

      user.verifiedEmail();

      user.clearEmailOTP();

      const payload: ITokenPayload = { userId: user.getUserId() };
      const token = this.tokenService.generateAccessToken(payload);

      await this.uow.startTransaction();
      await this.uow.writeUserRepo.updateUser(user); // save updated user
      await this.uow.commitTransaction();

      return {
        message: "Email verified successfully.",
        token,
      };
      
    } catch (error: any) {
      console.error("fail to verified otp ");
      throw error;
    } finally {
      this.uow.releaseTransaction();
    }
  }
}
