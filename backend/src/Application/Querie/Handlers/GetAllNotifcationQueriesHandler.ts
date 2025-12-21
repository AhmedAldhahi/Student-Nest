import { IReadNotificationRepositories } from "../../../Domain/Repositories/Read/ReadNotificationRepositories.repositories";
import { IQueriesHandlers } from "../IQuerieHandlers";
import { GetAllNotificationQueries } from "../Queries/GetAllNotifcation";

export class GetAllNotificationQueriesHandler
  implements IQueriesHandlers<GetAllNotificationQueries>
{
  constructor(private readonly readNotifyRepo: IReadNotificationRepositories) {}
  public async handle(): Promise<any> {
    try {
      return await this.readNotifyRepo.GetAllNotification();
    } catch (error: any) {
      console.error("fail to get all notification !!");
      throw error;
    }
  }
}
