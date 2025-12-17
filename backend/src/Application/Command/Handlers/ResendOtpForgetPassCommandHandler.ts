import { UserEntity } from "../../../Domain/Entities/userEntity.entity";
import { IReadUserRepositories } from "../../../Domain/Repositories/Read/ReadUserRepositories.repositories";
import { IUnitOfWork } from "../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { OTP } from "../../../Domain/Value-Object/OTP.vo";
import { ResendOtpForgetPassCommand } from "../Commands/ResendOtpForgetPassCommand";
import { ICommandHandlers } from "../ICommandHandlers";

export class ResendOtpForgetPassCommandHandler
  implements ICommandHandlers<ResendOtpForgetPassCommand>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly readUserRepo: IReadUserRepositories
  ) {}

  public async handle(
    command: ResendOtpForgetPassCommand
  ): Promise<{ user: UserEntity; otpvalue: string }> {
    const otp = OTP.generate();

    const otpvalue = otp.getValue();

    try {
      const user = await this.readUserRepo.findByEmail(command.email);

      if (!user) {
        throw new Error("no user been found !!");
      }

      user.resetVerifiedPassword();

      user.setOTPForResetPassword(otp);

      console.log(
        user.getOTPForResetPassword(),
        user.getOTPExpiredDateForResetPassword()
      );

      await this.uow.startTransaction();
      await this.uow.userRepo.updateUser(user);
      await this.uow.commitTransaction();

      return { user, otpvalue };
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to update otp for reset pass");
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
