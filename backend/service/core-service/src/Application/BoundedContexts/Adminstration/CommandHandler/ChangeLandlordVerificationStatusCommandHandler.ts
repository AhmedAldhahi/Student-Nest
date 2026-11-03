import { UpdateUserEvent } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Events/UpdateUserEvent.event";
import { IReadLandlordRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadLandlordRepositories.repositoreies";
import { IEventBus } from "../../../../Domain/Shared/Event/IEventBus";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { ChangeLandlordVerificationStatusCommand } from "../Command/ChangeLandlordVerificationStatusCommand";
import { ChangeLandlordVerificationStatusResponse } from "../Dto/Response/ChangeLandlordVerificationStatusResponse";

export class ChangeLandlordVerificationStatusCommandHandler
  implements ICommandHandlers<ChangeLandlordVerificationStatusCommand>
{
  constructor(
    private readLandlordRepo: IReadLandlordRepositories,
    private uow: IUnitOfWork,
    private readonly eventBus:IEventBus,
  ) {}

  public async handle(
    command: ChangeLandlordVerificationStatusCommand
  ): Promise<ChangeLandlordVerificationStatusResponse> {
    try {
      const user = await this.readLandlordRepo.findLandlordById(command.userId);
      if (!user) throw new Error("no user found !!");

      if (!user.getVerificationFile())
        throw new Error("user must have upload verification files");

      if (command.Verified === false) user.resetLandlordVerified();
      else user.markLandlordAsVerified();

      await this.uow.startTransaction();
      await this.uow.writeLandlordRepo.updateLandlord(user);
      await this.uow.commitTransaction();

      const event = new UpdateUserEvent(user.getUserId());

      await this.eventBus.publish(event);

      return {
        message: "landlord status updated scussfuly ",
      };
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to update edit landlord status", error);
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
