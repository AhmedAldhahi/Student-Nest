import { IReadLeaseRequestRepositories } from "../../../../../Domain/Modules/Leases/Repositories/Read/ReadLeaseRequestRepositories.repositories";
import { IQueriesHandlers } from "../../../IQueriesHandlers";
import { GetAllLeaseRequestQueries } from "../../../Queries/LeaseRequest/GetAllLeaseRequest";

export class GetAllLeaseRequestQueriesHandler
  implements IQueriesHandlers<GetAllLeaseRequestQueries>
{
  constructor(
    private readonly readLeaseRequestRepo: IReadLeaseRequestRepositories
  ) {}

  public async handle(): Promise<any> {
    try {
      return this.readLeaseRequestRepo.findAllLeaseRequest();
    } catch (error: any) {
      console.error("fail to fetch all lease request !!", error);
      throw error;
    }
  }
}
