import { GetLeaseRequestByQueryQueriesHandler } from "../../../Queries/Handlers/GetLeaseRequestByQueryQueriesHandler";
import { GetLeaseRequestByQuery } from "../../../Queries/Queries/GetLeaseRequestByQuery.Queries";

export class GetLeaseRequestByQueryUseCase {
  constructor(
    private readonly queriesHandler: GetLeaseRequestByQueryQueriesHandler
  ) {}

  public async execute(query: string) {
    try {
      const command = new GetLeaseRequestByQuery(query);
      return await this.queriesHandler.handle(command);
    } catch (error: any) {
      console.error("fail to get lease request !!");
      throw error;
    }
  }
}
