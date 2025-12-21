import { IReadLeaseRequestRepositories } from "../../../Domain/Repositories/Read/ReadLeaseRequestRepositories.repositories";
import { IQueriesHandlers } from "../IQuerieHandlers";
import { GetAllLeaseRequestQueries } from "../Queries/GetAllLeaseRequest";

export class GetAllLeaseRequestQueriesHandler
  implements IQueriesHandlers<GetAllLeaseRequestQueries>
{
  constructor(
    private readonly readLeaseRequestRepo: IReadLeaseRequestRepositories
  ) {}

  public async handle(): Promise<any> {
    try {
      const leaseRequest =
        await this.readLeaseRequestRepo.findAllLeaseRequest();

      return leaseRequest;
    } catch (error: any) {
      console.error("fail to fetch all lease request !!");
      throw error;
    }
  }
}
