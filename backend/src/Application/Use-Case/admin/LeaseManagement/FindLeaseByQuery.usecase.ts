import { GetLeaseByQueryQueriesHandler } from "../../../Queries/Handlers/GetLeaseByQueryQueriesHandler";
import { GetLeaseByQueryQueries } from "../../../Queries/Queries/GetLeaseByQuery.Queries";

export class FindLeasesByIdUseCase {
  constructor(private readonly QueriesHandler: GetLeaseByQueryQueriesHandler) {}

  public async execute(query: string) {
    try {
      const Queries = new GetLeaseByQueryQueries(query);
      return await this.QueriesHandler.handle(Queries);
    } catch (error: any) {
      console.error("fail to get lease by id");
      throw error;
    }
  }
}
