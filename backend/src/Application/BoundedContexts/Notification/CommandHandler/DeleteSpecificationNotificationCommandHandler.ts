import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { deleteSpecificNotificationsCommand } from "../Command/DeleteSpecficNotificationsCommand";
import { DeleteNotificationResponse } from "../Dto/Respone/deleteNotifcationResponse";

export class deleteSpecificNotificationsCommandHandler
  implements ICommandHandlers<deleteSpecificNotificationsCommand>
{
  constructor(private readonly uow: IUnitOfWork) {}

  public async handle(
    command: deleteSpecificNotificationsCommand
  ): Promise<DeleteNotificationResponse> {
    try {
      if (!command.ids || command.ids.length === 0)
        throw new Error("no notifications found !!");

      await this.uow.startTransaction();
      await this.uow.writeNotificationRepo.deleteSpecificNotifications(
        command.ids,
        command.userId
      );
      await this.uow.commitTransaction();

      return {
        message: `all notifications ids been deleted : ${command.ids}`,
      };
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to delete these notifications !!");
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
