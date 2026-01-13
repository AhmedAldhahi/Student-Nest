import { IReadLeaseRepositories } from "../../../../../Domain/Modules/Leases/Repositories/Read/ReadLeaseRepositories.repositories";
import { IQueriesHandlers } from "../../../IQueriesHandlers";
import { GetAllLeaseQueries } from "../../../Queries/Lease/GetAllLease"

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