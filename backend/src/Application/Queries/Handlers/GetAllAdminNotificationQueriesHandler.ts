import { IReadNotificationRepositories } from "../../../Domain/Repositories/Read/ReadNotificationRepositories.repositories";
import { IQueriesHandlers } from "../IQueriesHandlers";
import { GetAllNotificationQueries } from "../Queries/GetAllNotifcation";

export class GetAllAdminNotificationQueriesHandler
  implements IQueriesHandlers<GetAllNotificationQueries>
{
  constructor(
    private readonly readNotificationRepo: IReadNotificationRepositories
  ) {}

  public async handle(command: GetAllNotificationQueries): Promise<any> {
    try {
      return await this.readNotificationRepo.GetAllAdminNotification(
        command.userId
      );
    } catch (error: any) {
      console.error("fail to fetch admin  notifications !!");
      throw error;
    }
  }
}
