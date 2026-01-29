import { IReadLeaseRepositories } from "../../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRepositories.repositories";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetAllLeaseQueries } from "../Queries/GetAllLease"

export class GetAllLeaseQueriesHandler
  implements IQueriesHandlers<GetAllLeaseQueries>
{
  constructor(private readonly ReadLeaseRepo: IReadLeaseRepositories) {}

  public async handle(): Promise<any> {
    try {
      const lease = await this.ReadLeaseRepo.findAll();

      return lease;
    } catch (error: any) {
      console.error("fail to fetch lease !!");
      throw error;
    }
  }
}