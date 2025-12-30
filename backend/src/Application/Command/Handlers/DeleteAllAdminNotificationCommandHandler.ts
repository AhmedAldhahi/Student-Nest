import { IReadUserRepositories } from "../../../Domain/Repositories/Read/ReadUserRepositories.repositories";
import { IUnitOfWork } from "../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { DeleteAllNotificationCommand } from "../Commands/DeleteAllNotificationCommand";
import { ICommandHandlers } from "../ICommandHandlers";

export class DeleteAllAdminNotificationCommandHandler
  implements ICommandHandlers<DeleteAllNotificationCommand>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly readUserRepo: IReadUserRepositories
  ) {}

  public async handle(command: DeleteAllNotificationCommand): Promise<any> {
    try {
      const user = await this.readUserRepo.findById(command.userId);

      if (!user) throw new Error("no user been found !!");

      await this.uow.startTransaction();
      await this.uow.writeNotificationRepo.deleteAllAdminNotification(
        command.userId,
        user.getRole()
      );

      await this.uow.commitTransaction();
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to delete admins notifications !!");
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
