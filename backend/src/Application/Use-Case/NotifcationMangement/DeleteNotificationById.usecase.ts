import { deleteNotificationByIdCommand } from "../../Command/Commands/DeleteNotificationByIdCommand";
import { deleteNotificationByIdCommandHandler } from "../../Command/Handlers/DeleteNotificationByIdCommandHandler";

export class DeleteNotificationByIdUseCase {
  constructor(
    private readonly commandHandler: deleteNotificationByIdCommandHandler
  ) {}

  public async execute(id: number, userId: string) {
    try {
      const command = new deleteNotificationByIdCommand(id, userId);
      await this.commandHandler.handle(command);
      return {
        message: "notification delete successfully",
      };
    } catch (error: any) {
      console.error("fail to delete notification !!");
      throw error;
    }
  }
}
