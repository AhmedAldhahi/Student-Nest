import { UserAccountStatus } from "../../../../Domain/Shared/Enum/UserAccountStatus.enum";
import { IReadUserRepositories } from "../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { UpdateUserActivateStatus } from "../../Commands/User/updateUserActivateStatus.command";
import { ICommandHandlers } from "../../ICommandHandlers";

export class UpdateUserActivateStatusCommandHandler
  implements ICommandHandlers<UpdateUserActivateStatus>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly readUserRepo: IReadUserRepositories
  ) {}

  public async handle(command: UpdateUserActivateStatus): Promise<any> {
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
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to update user account status !!", error);
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
