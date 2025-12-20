import { IReadLeaseRepositories } from "../../../Domain/Repositories/Read/ReadLeaseRepositories.repositories";
import { IQueriesHandlers } from "../IQuerieHandlers";
import { GetLeaseByIdQueries } from "../Queries/GetLeaseById.Queries";

export class GetLeaseByIdQueriesHandler
  implements IQueriesHandlers<GetLeaseByIdQueries>
{
  constructor(private readonly ReadLeaseRepo: IReadLeaseRepositories) {}

  public async handle(command: GetLeaseByIdQueries): Promise<any> {
    try {
      return this.ReadLeaseRepo.findById(command.leaseId);
    } catch (error: any) {
      console.error("fail during fetch lease by it own id");
      throw error;
    }
  }
}
