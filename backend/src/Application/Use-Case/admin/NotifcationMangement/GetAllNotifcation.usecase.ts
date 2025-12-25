import { GetAllNotificationQueriesHandler } from "../../../Queries/Handlers/GetAllNotifcationQueriesHandler";
import { GetAllNotificationQueries } from "../../../Queries/Queries/GetAllNotifcation";

export class GetAllNotificationUseCase {
  constructor(
    private readonly queriesHandler: GetAllNotificationQueriesHandler
  ) {}

  public async execute(userId: string) {
    try {
      const Queries = new GetAllNotificationQueries(userId);
      return await this.queriesHandler.handle(Queries);
    } catch (error: any) {
      throw error;
    }
  }
}
