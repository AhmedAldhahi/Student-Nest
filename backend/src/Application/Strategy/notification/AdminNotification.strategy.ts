import { deleteAdminNotificationByIdCommand } from "../../Command/Commands/DeleteAdminNotifcationByIdCommand";
import { DeleteAllNotificationCommand } from "../../Command/Commands/DeleteAllNotificationCommand";
import { deleteAdminNotificationByIdCommandHandler } from "../../Command/Handlers/DeleteAdminNotificationByIdCommandHandler";
import { DeleteAllAdminNotificationCommandHandler } from "../../Command/Handlers/DeleteAllAdminNotificationCommandHandler";
import { GetAllAdminNotificationQueriesHandler } from "../../Queries/Handlers/GetAllAdminNotificationQueriesHandler";
import { GetAllNotificationQueries } from "../../Queries/Queries/GetAllNotifcation";
import { INotificationsStrategy } from "./Inotification.strategy";

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
