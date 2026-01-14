
import { deleteAdminNotificationByIdCommand } from "../../../Notification/Command/DeleteAdminNotifcationByIdCommand";
import { DeleteAllNotificationCommand } from "../../../Notification/Command/DeleteAllNotificationCommand";
import { deleteAdminNotificationByIdCommandHandler } from "../../../Notification/CommandHandler/DeleteAdminNotificationByIdCommandHandler";
import { DeleteAllAdminNotificationCommandHandler } from "../../../Notification/CommandHandler/DeleteAllAdminNotificationCommandHandler";
import { GetAllNotificationQueries } from "../../../Notification/Queries/GetAllNotification";
import { GetAllAdminNotificationQueriesHandler } from "../../../Notification/QueriesHandler/GetAllAdminNotificationQueriesHandler";
import { INotificationsStrategy } from "./INotification.strategy";

export class AdminNotificationsStrategy implements INotificationsStrategy {
  constructor(
    private readonly queryHandler: GetAllAdminNotificationQueriesHandler,
    private readonly commandHandler: DeleteAllAdminNotificationCommandHandler,
    private readonly DeleteNotificationByIdCH: deleteAdminNotificationByIdCommandHandler
  ) {}

  public async DeleteNotificationById(
    userId: string,
    id: number
  ): Promise<any> {
    try {
      const command = new deleteAdminNotificationByIdCommand(id, userId);
      return await this.DeleteNotificationByIdCH.handle(command);
    } catch (error: any) {
      console.error("fail to delete admin notifications !!");
      return error;
    }
  }

  public async DeleteAllNotifications(userId: string): Promise<any> {
    try {
      const command = new DeleteAllNotificationCommand(userId);
      return await this.commandHandler.handle(command);
    } catch (error: any) {
      console.error("fail to delete admins notifications !!");
      throw error;
    }
  }

  public async UserNotifications(userId: string): Promise<any> {
    try {
      const Queries = new GetAllNotificationQueries(userId);
      return await this.queryHandler.handle(Queries);
    } catch (error: any) {
      console.error("fail to get admin notifications !!");
      throw error;
    }
  }
}
