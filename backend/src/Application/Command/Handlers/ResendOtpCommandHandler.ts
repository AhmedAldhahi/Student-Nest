import { UserEntity } from "../../../Domain/Entities/userEntity.entity";
import { IReadUserRepositories } from "../../../Domain/Repositories/Read/ReadUserRepositories.repositories";
import { IUnitOfWork } from "../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { OTP } from "../../../Domain/Value-Object/OTP.vo";
import { ResendOtpCommand } from "../Commands/ResendOtpCommand";
import { ICommandHandlers } from "../ICommandHandlers";

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
