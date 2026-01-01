import { IReadLeaseRequestRepositories } from "../../../../../Domain/Modules/Leases/Repositories/Read/ReadLeaseRequestRepositories.repositories";
import { IQueriesHandlers } from "../../../IQueriesHandlers";
import { GetLeaseRequestByQuery } from "../../../Queries/LeaseRequest/GetLeaseRequestByQuery.Queries";

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
