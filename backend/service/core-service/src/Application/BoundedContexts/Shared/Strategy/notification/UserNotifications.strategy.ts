import { deleteAdminNotificationByIdCommand } from "../../../Notification/Command/DeleteAdminNotifcationByIdCommand";
import { DeleteAllNotificationCommand } from "../../../Notification/Command/DeleteAllNotificationCommand";
import { DeleteAllNotificationCommandHandler } from "../../../Notification/CommandHandler/DeleteAllNotificationCommandHandler";
import { deleteNotificationByIdCommandHandler } from "../../../Notification/CommandHandler/DeleteNotificationByIdCommandHandler";
import { GetAllNotificationQueries } from "../../../Notification/Queries/GetAllNotification";
import { GetAllNotificationQueriesHandler } from "../../../Notification/QueriesHandler/GetAllNotifcationQueriesHandler";
import { INotificationsStrategy } from "./INotification.strategy";

export class UserNotificationsStrategy implements INotificationsStrategy {
  constructor(
    private readonly queryHandler: GetAllNotificationQueriesHandler,
    private readonly commandHandler: DeleteAllNotificationCommandHandler,
    private readonly DeleteNotificationByIdCH: deleteNotificationByIdCommandHandler
  ) {}

  public async DeleteNotificationById(
    userId: string,
    id: number
  ): Promise<any> {
    try {
      const command = new deleteAdminNotificationByIdCommand(id, userId);
      return await this.DeleteNotificationByIdCH.handle(command);
    } catch (error: any) {
      console.error("fail to delete  notifications message !!");
      throw error;
    }
  }

  public async DeleteAllNotifications(userId: string): Promise<any> {
    try {
      const command = new DeleteAllNotificationCommand(userId);
      return await this.commandHandler.handle(command);
    } catch (error: any) {
      console.error("fail to delete all notifications", error);
      throw error;
    }
  }

  public async UserNotifications(userId: string): Promise<any> {
    try {
      const query = new GetAllNotificationQueries(userId);
      return await this.queryHandler.handle(query);
    } catch (error: any) {
      console.error("fail to get notifications !!");
      throw error;
    }
  }
}
