import { GetAllNotificationQueriesHandler } from "../../../Querie/Handlers/GetAllNotifcationQueriesHandler";
import { GetAllNotificationQueries } from "../../../Querie/Queries/GetAllNotifcation";

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
