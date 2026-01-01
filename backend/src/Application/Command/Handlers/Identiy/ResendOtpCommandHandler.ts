import { UserEntity } from "../../../../Domain/Modules/Identity/Entities/userEntity.entity";
import { IReadUserRepositories } from "../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { OTP } from "../../../../Domain/Shared/Value-Object/OTP.vo";
import { ICommandHandlers } from "../../ICommandHandlers";
import{ResendOtpCommand} from "../../Commands/User/ResendOtpCommand"

export class ResendOtpCommandHandler
  implements ICommandHandlers<ResendOtpCommand>
{
  constructor(
    private ReadUserRepo: IReadUserRepositories,
    private unitOfWork: IUnitOfWork
  ) {}

  public async handle(
    command: ResendOtpCommand
  ): Promise<{ user: UserEntity; otpValue: string }> {
    const otp = OTP.generate();
    const otpValue = otp.getValue();

    try {
      const user = await this.ReadUserRepo.findByEmail(command.email);
      if (!user) {
        throw new Error("no user been found !!");
      }

      if (user.getVerifiedEmail()) {
        throw new Error("this email is been verified !!");
      }

      user.setOtpForEmail(otp);

      console.log(user.getOtpForEmail(), user.getOtpExpiredForEmail());

      await this.unitOfWork.startTransaction();

      await this.unitOfWork.writeUserRepo.updateUser(user);
      await this.unitOfWork.commitTransaction();

      return { user, otpValue };
    } catch (err: any) {
      await this.unitOfWork.rollbackTransaction();
      console.error("Failed to update OTP code:", err.message);
      throw err;
    } finally {
      this.unitOfWork.releaseTransaction();
    }
  }
}
