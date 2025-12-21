import { GetAllNotificationQueriesHandler } from "../../../Querie/Handlers/GetAllNotifcationQueriesHandler";

export class GetAllNotificationUseCase {
  constructor(
    private readonly queriesHandler: GetAllNotificationQueriesHandler
  ) {}

  public async execute() {
    try {
      return await this.queriesHandler.handle();
    } catch (error: any) {
      throw error;
    }
  }
}
