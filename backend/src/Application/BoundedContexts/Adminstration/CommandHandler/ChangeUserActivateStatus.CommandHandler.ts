import { UserAccountStatus } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Enum/UserAccountStatus.enum";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { UpdateUserActivateStatus } from "../Command/updateUserActivateStatus.command";
import { ChangeUserActivateStatusResponse } from "../Dto/Response/ChangeUserActivityStatusResponse";

export class ChangeUserActivateStatusCommandHandler
  implements ICommandHandlers<UpdateUserActivateStatus>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly readUserRepo: IReadUserRepositories
  ) {}

  public async handle(
    command: UpdateUserActivateStatus
  ): Promise<ChangeUserActivateStatusResponse> {
    try {
      const user = await this.readUserRepo.findById(command.id);
      if (!user) throw new Error("no user found !!");

      if (command.data === UserAccountStatus.activate) {
        user.activatedAccount();
      }

      if (command.data === UserAccountStatus.banded) {
        user.banAccount();
      }

      if (command.data === UserAccountStatus.deactivate) {
        user.deactivateAccount();
      }

      await this.uow.startTransaction();
      await this.uow.writeUserRepo.updateUser(user);
      await this.uow.commitTransaction();
      return {
        message: "user account status updated !!",
      };
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to update user account status !!", error);
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
