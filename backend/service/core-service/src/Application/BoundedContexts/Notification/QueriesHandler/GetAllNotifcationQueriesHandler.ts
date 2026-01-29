import { IReadNotificationRepositories } from "../../../../Domain/BoundedContexts/Notifications/Repositories/ReadNotificationRepositories.repositories";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetAllNotificationQueries } from "../Queries/GetAllNotification";

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

