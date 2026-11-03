import { ResendOtpEvent } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Events/ResendOtpEvent.event";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { OTP } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/OTP.vo";
import { IEventBus } from "../../../../Domain/Shared/Event/IEventBus";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { ResendOtpCommand } from "../Command/ResendOtpCommand";
import { ResendOtpForgetPassCommand } from "../Command/ResendOtpForgetPassCommand";
import { ResendOtpResponse } from "../Dto/Response/ResendOtpResponse";

export class ResendOtpCommandHandler
  implements ICommandHandlers<ResendOtpForgetPassCommand>
{
  constructor(
    private readonly ReadUserRepo: IReadUserRepositories,
    private readonly unitOfWork: IUnitOfWork,
    private readonly eventBus: IEventBus
  ) {}

  public async handle(command: ResendOtpCommand): Promise<ResendOtpResponse> {
    const otp = OTP.generate();

    try {
      const user = await this.ReadUserRepo.findByEmail(command.email);
      if (!user) {
        throw new Error("no user been found !!");
      }

      if (user.getVerifiedEmail()) {
        throw new Error("this email is been verified !!");
      }

      user.setOtpForEmail(otp);


      await this.unitOfWork.startTransaction();

      await this.unitOfWork.writeUserRepo.updateUser(user);
      await this.unitOfWork.commitTransaction();

      const event = new ResendOtpEvent(
        user.getUserId(),
        command.email,
        otp.getValue()
      );
      await this.eventBus.publish(event);

      return {
        message: "OTP has been resent successfully. Check your email.",
      };
    } catch (err: any) {
      await this.unitOfWork.rollbackTransaction();
      console.error("Failed to update OTP code:", err.message);
      throw err;
    } finally {
      this.unitOfWork.releaseTransaction();
    }
  }
}
