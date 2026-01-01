import { IReadNotificationRepositories } from "../../../../Domain/Shared/Repositories/ReadNotificationRepositories.repositories";
import { IQueriesHandlers } from "../../IQueriesHandlers";
import { GetAllNotificationQueries } from "../../Queries/Notification/GetAllNotifcation";

export class GetAllNotificationQueriesHandler
  implements IQueriesHandlers<GetAllNotificationQueries>
{
  constructor(private readonly readNotifyRepo: IReadNotificationRepositories) {}
  public async handle(command: GetAllNotificationQueries): Promise<any> {
    try {
      return await this.readNotifyRepo.GetAllNotification(command.userId);
    } catch (error: any) {
      console.error("fail to get all notification !!");
      throw error;
    }
  }
}

