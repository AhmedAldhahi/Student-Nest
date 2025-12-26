import { IUnitOfWork } from "../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { deleteSpecificNotificationsCommand } from "../Commands/DeleteSpecficNotificationsCommand";
import { ICommandHandlers } from "../ICommandHandlers";

export class deleteSpecificNotificationsCommandHandler
  implements ICommandHandlers<deleteSpecificNotificationsCommand>
{
  constructor(private readonly uow: IUnitOfWork) {}

  public async handle(
    command: deleteSpecificNotificationsCommand
  ): Promise<any> {
    try {

      if (!command.ids || command.ids.length === 0)
        throw new Error("no notifications found !!");

      await this.uow.startTransaction();
      await this.uow.writeNotificationRepo.deleteSpecificNotifications(
        command.ids,
        command.userId
      );
      await this.uow.commitTransaction();
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to delete these notifications !!");
      throw error;
    } finally {
        await this.uow.releaseTransaction();
    }
  }
}
