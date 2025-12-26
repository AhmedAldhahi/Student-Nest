import { DeleteAllNotificationCommand } from "../../../Command/Commands/DeleteAllNotificationCommand";
import { DeleteAllNotificationCommandHandler } from "../../../Command/Handlers/DeleteAllNotificationCommandHandler";

export class DeleteAllNotificationUseCase {
  constructor(
    private readonly commandHandler: DeleteAllNotificationCommandHandler
  ) {}

  public async execute(userId: string) {
    try {
      const command = new DeleteAllNotificationCommand(userId);
      await this.commandHandler.handle(command);
      return {
        message: "all notification deleted successful",
      };
    } catch (error: any) {
      console.error("fail to delete all notification !!");
      throw error;
    }
  }
}
