import { GetLeaseByIdQueriesHandler } from "../../../Querie/Handlers/GetLeaseByIdQueriesHandler";
import { GetLeaseByIdQueries } from "../../../Querie/Queries/GetLeaseById.Queries";

export class FindLeasesByIdUseCase {
  constructor(private readonly QueriesHandler: GetLeaseByIdQueriesHandler) {}

  public async execute(leaseId: number) {
    try {
      const Queries = new GetLeaseByIdQueries(leaseId);
      return await this.QueriesHandler.handle(Queries);
    } catch (error: any) {
      console.error("fail to get lease by id");
      throw error;
    }
  }
}
