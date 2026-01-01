import { deleteSpecificNotificationsCommand } from "../../Command/Commands/Notification/DeleteSpecficNotificationsCommand";
import { deleteSpecificNotificationsCommandHandler } from "../../Command/Handlers/Shared/Notification/DeleteSpecificationNotificationCommandHandler";
export class DeleteSpecificNotificationsUseCase {
  constructor(
    private readonly commandHandler: deleteSpecificNotificationsCommandHandler
  ) {}

  public async execute(id: number[], userId: string) {
    try {
      const command = new deleteSpecificNotificationsCommand(id, userId);
      await this.commandHandler.handle(command);
      return {
        message: "notifications been deleted",
      };
    } catch (error: any) {
      console.error("fail to delete all notifications !!");
      throw error;
    }
  }
}
