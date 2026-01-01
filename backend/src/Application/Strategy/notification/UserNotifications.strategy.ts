import { deleteAdminNotificationByIdCommand } from "../../Command/Commands/Notification/DeleteAdminNotifcationByIdCommand";
import { DeleteAllNotificationCommand } from "../../Command/Commands/Notification/DeleteAllNotificationCommand";
import { DeleteAllNotificationCommandHandler } from "../../Command/Handlers/Shared/Notification/DeleteAllNotificationCommandHandler";
import { deleteNotificationByIdCommandHandler } from "../../Command/Handlers/Shared/Notification/DeleteNotificationByIdCommandHandler";
import { GetAllNotificationQueriesHandler } from "../../Queries/Handlers/Notification/GetAllNotifcationQueriesHandler";
import { GetAllNotificationQueries } from "../../Queries/Queries/Notification/GetAllNotifcation";
import { INotificationsStrategy } from "./Inotification.strategy";

export class UserNotificationsStrategy implements INotificationsStrategy {
  constructor(
    private readonly queryHandler: GetAllNotificationQueriesHandler,
    private readonly commandHandler: DeleteAllNotificationCommandHandler,
    private readonly DeleteNotificationByIdCH: deleteNotificationByIdCommandHandler
  ) {}

  public async DeleteNotificationById(userId: string, id: number): Promise<any> {
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
