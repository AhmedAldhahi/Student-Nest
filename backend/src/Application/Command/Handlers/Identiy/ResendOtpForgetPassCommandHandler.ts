import { UserEntity } from "../../../../Domain/Modules/Identity/Entities/userEntity.entity";
import { IReadUserRepositories } from "../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { OTP } from "../../../../Domain/Shared/Value-Object/OTP.vo";
import{ResendOtpForgetPassCommand} from "../../Commands/User/ResendOtpForgetPassCommand"

import { ICommandHandlers } from "../../ICommandHandlers";

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
      await this.uow.writeUserRepo.updateUser(user);
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
