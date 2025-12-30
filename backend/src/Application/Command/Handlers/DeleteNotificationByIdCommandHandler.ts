import { IReadNotificationRepositories } from "../../../Domain/Repositories/Read/ReadNotificationRepositories.repositories";
import { IUnitOfWork } from "../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { deleteNotificationByIdCommand } from "../Commands/DeleteNotificationByIdCommand";
import { ICommandHandlers } from "../ICommandHandlers";

export class deleteNotificationByIdCommandHandler
  implements ICommandHandlers<deleteNotificationByIdCommand>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly ReadNotificationRepo: IReadNotificationRepositories
  ) {}

  public async handle(command: deleteNotificationByIdCommand): Promise<any> {
    try {
      const notification = 
      await this.ReadNotificationRepo.GetNotificationById(command.id);

      if (!notification)
        throw new Error("no notification with this id found !!");

      await this.uow.startTransaction();
      await this.uow.writeNotificationRepo.deleteNotificationById(
        command.id,
        command.userId
      );
      await this.uow.commitTransaction();
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to delete notification !!");
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
