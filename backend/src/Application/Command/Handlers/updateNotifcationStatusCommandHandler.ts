import { IReadNotificationRepositories } from "../../../Domain/Repositories/Read/ReadNotificationRepositories.repositories";
import { IUnitOfWork } from "../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { UpdateNotificationStatusCommand } from "../Commands/UpdateNotifcationStatusCommand";
import { ICommandHandlers } from "../ICommandHandlers";

export class UpdateNotificationStatusCommandHandler
  implements ICommandHandlers<UpdateNotificationStatusCommand>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly ReadNotificationRepo: IReadNotificationRepositories
  ) {}

  public async handle(command: UpdateNotificationStatusCommand): Promise<any> {
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
      await this.uow.writeNotificationRepo.updateNotificationStatus(
        notificationRepo
      );
      await this.uow.commitTransaction();
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to update status !!");
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
