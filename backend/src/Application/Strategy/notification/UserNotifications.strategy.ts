import { GetAllNotificationQueriesHandler } from "../../Queries/Handlers/GetAllNotifcationQueriesHandler";
import { GetAllNotificationQueries } from "../../Queries/Queries/GetAllNotifcation";
import { INotificationsStrategy } from "./Inotification.strategy";

export class UserNotificationsStrategy implements INotificationsStrategy {
  constructor(
    private readonly queryHandler: GetAllNotificationQueriesHandler
  ) {}

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
