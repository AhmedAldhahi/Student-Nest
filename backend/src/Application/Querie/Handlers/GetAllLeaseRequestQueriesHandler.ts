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
      return this.readLeaseRequestRepo.findAllLeaseRequest();
    } catch (error: any) {
      console.error("fail to fetch all lease request !!", error);
      throw error;
    }
  }
}
