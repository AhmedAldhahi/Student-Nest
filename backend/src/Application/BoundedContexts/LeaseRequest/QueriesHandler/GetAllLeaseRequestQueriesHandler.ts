import { IReadLeaseRequestRepositories } from "../../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRequestRepositories.repositories";
import { GetAllLeaseRequestQueries } from "../Queries/GetAllLeaseRequest";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";

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
