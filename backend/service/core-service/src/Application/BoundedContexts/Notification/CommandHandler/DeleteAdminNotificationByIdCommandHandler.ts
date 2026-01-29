import { IReadNotificationRepositories } from "../../../../Domain/BoundedContexts/Notifications/Repositories/ReadNotificationRepositories.repositories";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { deleteAdminNotificationByIdCommand } from "../Command/DeleteAdminNotifcationByIdCommand";
import { DeleteNotificationResponse } from "../Dto/Respone/deleteNotifcationResponse";

export class deleteAdminNotificationByIdCommandHandler
  implements ICommandHandlers<deleteAdminNotificationByIdCommand>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly ReadNotificationRepo: IReadNotificationRepositories
  ) {}

  public async handle(
    command: deleteAdminNotificationByIdCommand
  ): Promise<DeleteNotificationResponse> {
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

      return {
        message: `"notification id : ${command.id}" been deleted !!`,
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
