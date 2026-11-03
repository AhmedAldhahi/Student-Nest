import { IReadNotificationRepositories } from "../../../../Domain/BoundedContexts/Notifications/Repositories/ReadNotificationRepositories.repositories";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { UpdateNotificationStatusCommand } from "../Command/UpdateNotifcationStatusCommand";
import { DeleteNotificationResponse } from "../Dto/Respone/deleteNotifcationResponse";
import { UpdateNotificationResponse } from "../Dto/Respone/updateNotificationResponse";

export class UpdateNotificationStatusCommandHandler
  implements ICommandHandlers<UpdateNotificationStatusCommand>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly ReadNotificationRepo: IReadNotificationRepositories
  ) {}

  public async handle(
    command: UpdateNotificationStatusCommand
  ): Promise<UpdateNotificationResponse> {
    try {
      const notificationRepo =
        await this.ReadNotificationRepo.GetNotificationById(command.id);

      if (!notificationRepo) throw new Error("no notification found !!");

      // mark as unread
      if (command.isRead === false) {
        notificationRepo.markAsNotRead();
      }

      // mark as read
      if (command.isRead === true) {
        notificationRepo.markAsRead();
      }

      await this.uow.startTransaction();
      await this.uow.writeNotificationRepo.updateNotification(notificationRepo);
      await this.uow.commitTransaction();

      return {
        message: `the notification id : ${command.id} been updated !!`,
      };
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to update status !!");
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
