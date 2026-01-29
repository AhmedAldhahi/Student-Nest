import { IReadLeaseRequestRepositories } from "../../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRequestRepositories.repositories";
import { GetLeaseRequestByQuery } from "../Queries/GetLeaseRequestByQuery.Queries";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";

export class GetLeaseRequestByQueryQueriesHandler
  implements IQueriesHandlers<GetLeaseRequestByQuery>
{
  constructor(
    private readonly readLeaseRequestRepo: IReadLeaseRequestRepositories
  ) {}

  public async handle(command: GetLeaseRequestByQuery): Promise<any> {
    try {
      return await this.readLeaseRequestRepo.findLeaseRequestByQuery(
        command.Query
      );
    } catch (error: any) {
      console.error("fail to get lease request by id !!");
      throw error;
    }
  }
}
