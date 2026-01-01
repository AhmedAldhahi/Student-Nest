import { IReadNotificationRepositories } from "../../../../../Domain/Shared/Repositories/ReadNotificationRepositories.repositories";
import { IUnitOfWork } from "../../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { deleteAdminNotificationByIdCommand } from "../../../Commands/Notification/DeleteAdminNotifcationByIdCommand";
import { ICommandHandlers } from "../../../ICommandHandlers";

export class deleteAdminNotificationByIdCommandHandler
  implements ICommandHandlers<deleteAdminNotificationByIdCommand>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly ReadNotificationRepo: IReadNotificationRepositories
  ) {}

  public async handle(
    command: deleteAdminNotificationByIdCommand
  ): Promise<any> {
    try {
      const notification = await this.ReadNotificationRepo.GetNotificationById(
        command.id
      );

      if (!notification)
        throw new Error("no notification with this id found !!");

      await this.uow.startTransaction();
      await this.uow.writeNotificationRepo.deleteAdminNotificationById(
        command.userId,
        command.id
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
