import { GetAllAdminNotificationQueriesHandler } from "../../Queries/Handlers/GetAllAdminNotificationQueriesHandler";
import { GetAllNotificationQueries } from "../../Queries/Queries/GetAllNotifcation";
import { INotificationsStrategy } from "./Inotification.strategy";

export class AdminNotificationsStrategy implements INotificationsStrategy {
  constructor(
    private readonly queryHandler: GetAllAdminNotificationQueriesHandler
  ) {}

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
