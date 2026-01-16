import { IReadNotificationRepositories } from "../../../../Domain/BoundedContexts/Notifications/Repositories/ReadNotificationRepositories.repositories";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { deleteNotificationByIdCommand } from "../Command/DeleteNotificationByIdCommand";
import { DeleteNotificationResponse } from "../Dto/Respone/deleteNotifcationResponse";

export class deleteNotificationByIdCommandHandler
  implements ICommandHandlers<deleteNotificationByIdCommand>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly ReadNotificationRepo: IReadNotificationRepositories
  ) {}

  public async handle(
    command: deleteNotificationByIdCommand
  ): Promise<DeleteNotificationResponse> {
    try {
      const notification = await this.ReadNotificationRepo.GetNotificationById(
        command.id
      );

      if (!notification)
        throw new Error("no notification with this id found !!");

      await this.uow.startTransaction();
      await this.uow.writeNotificationRepo.deleteNotificationById(
        command.id,
        command.userId
      );
      await this.uow.commitTransaction();

      return {
        message: "notification been deleted !!",
      };
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to delete notification !!");
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
