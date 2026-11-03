import { UserEntity } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Entities/userEntity.entity";
import { ResendOtpEvent } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Events/ResendOtpEvent.event";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { OTP } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/OTP.vo";
import { IEventBus } from "../../../../Domain/Shared/Event/IEventBus";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { ResendOtpForgetPassCommand } from "../Command/ResendOtpForgetPassCommand";
import { ResendOtpResponse } from "../Dto/Response/ResendOtpResponse";

export class ResendOtpForgetPassCommandHandler
  implements ICommandHandlers<ResendOtpForgetPassCommand>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly readUserRepo: IReadUserRepositories,
    private readonly eventBus: IEventBus
  ) {}

  public async handle(
    command: ResendOtpForgetPassCommand
  ): Promise<ResendOtpResponse> {
    const otp = OTP.generate();

    try {
      const user = await this.readUserRepo.findByEmail(command.email);

      if (!user) {
        throw new Error("no user been found !!");
      }

      user.resetVerifiedPassword();

      user.setOTPForResetPassword(otp);

      await this.uow.startTransaction();
      await this.uow.writeUserRepo.updateUser(user);
      await this.uow.commitTransaction();

      const event = new ResendOtpEvent(
        user.getUserId(),
        command.email,
        otp.getValue()
      );

      await this.eventBus.publish(event);

      return {
        message: "OTP has been resent successfully. Check your email.",
      };
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to update otp for reset pass");
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
