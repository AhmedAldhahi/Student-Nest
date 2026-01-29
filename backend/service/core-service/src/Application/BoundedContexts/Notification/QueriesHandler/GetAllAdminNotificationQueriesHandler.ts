import { IReadNotificationRepositories } from "../../../../Domain/BoundedContexts/Notifications/Repositories/ReadNotificationRepositories.repositories";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetAllNotificationQueries } from "../Queries/GetAllNotification";

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
