import { IReadLeaseRepositories } from "../../../Domain/Repositories/Read/ReadLeaseRepositories.repositories";
import { IQueriesHandlers } from "../IQueriesHandlers";
import { GetLeaseByQueryQueries } from "../Queries/GetLeaseByQuery.Queries";

export class GetLeaseByQueryQueriesHandler
  implements IQueriesHandlers<GetLeaseByQueryQueries>
{
  constructor(private readonly ReadLeaseRepo: IReadLeaseRepositories) {}

  public async handle(command: GetLeaseByQueryQueries): Promise<any> {
    try {
      return this.ReadLeaseRepo.findByQuery(command.Query);
    } catch (error: any) {
      console.error("fail during fetch lease by it own id");
      throw error;
    }
  }
}
