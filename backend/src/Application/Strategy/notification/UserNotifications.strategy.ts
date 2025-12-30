import { DeleteAllNotificationCommand } from "../../Command/Commands/DeleteAllNotificationCommand";
import { DeleteAllNotificationCommandHandler } from "../../Command/Handlers/DeleteAllNotificationCommandHandler";
import { GetAllNotificationQueriesHandler } from "../../Queries/Handlers/GetAllNotifcationQueriesHandler";
import { GetAllNotificationQueries } from "../../Queries/Queries/GetAllNotifcation";
import { INotificationsStrategy } from "./Inotification.strategy";

export class UserNotificationsStrategy implements INotificationsStrategy {
  constructor(
    private readonly queryHandler: GetAllNotificationQueriesHandler,
    private readonly commandHandler: DeleteAllNotificationCommandHandler
  ) {}

  public async DeleteAllNotifications(userId: string): Promise<any> {
    try {
       const command = new DeleteAllNotificationCommand(userId);
        return await this.commandHandler.handle(command);
    } catch (error: any) {
      console.error("fail to delete all notifications",error);
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
