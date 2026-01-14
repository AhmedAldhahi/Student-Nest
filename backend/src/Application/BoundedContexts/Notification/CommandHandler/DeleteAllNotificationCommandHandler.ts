import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { DeleteAllNotificationCommand } from "../Command/DeleteAllNotificationCommand";

export class DeleteAllNotificationCommandHandler
  implements ICommandHandlers<DeleteAllNotificationCommand>
{
  constructor(private readonly uow: IUnitOfWork) {}

  public async handle(command: DeleteAllNotificationCommand): Promise<any> {
    try {
      await this.uow.startTransaction();
      await this.uow.writeNotificationRepo.deleteAllNotification(
        command.userId
      );
      await this.uow.commitTransaction();
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to delete all notification !!");
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
