import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { DeleteAllNotificationCommand } from "../Command/DeleteAllNotificationCommand";
import { DeleteNotificationResponse } from "../Dto/Respone/deleteNotifcationResponse";

export class DeleteAllAdminNotificationCommandHandler
  implements ICommandHandlers<DeleteAllNotificationCommand>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly readUserRepo: IReadUserRepositories
  ) {}

  public async handle(
    command: DeleteAllNotificationCommand
  ): Promise<DeleteNotificationResponse> {
    try {
      const user = await this.readUserRepo.findById(command.userId);

      if (!user) throw new Error("no user been found !!");

      await this.uow.startTransaction();
      await this.uow.writeNotificationRepo.deleteAllAdminNotification(
        command.userId,
        user.getRole()
      );

      await this.uow.commitTransaction();

      return {
        message: "all notifications been deleted !!",
      };
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to delete admins notifications !!");
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
