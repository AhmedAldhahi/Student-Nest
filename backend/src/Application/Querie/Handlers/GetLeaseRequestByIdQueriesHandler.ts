import { IReadLeaseRequestRepositories } from "../../../Domain/Repositories/Read/ReadLeaseRequestRepositories.repositories";
import { IQueriesHandlers } from "../IQuerieHandlers";
import { GetLeaseRequestById } from "../Queries/GetLeaseRequestById.Queries";

export class GetLeaseRequestByIDQueriesHandler
  implements IQueriesHandlers<GetLeaseRequestById>
{
  constructor(
    private readonly readLeaseRequestRepo: IReadLeaseRequestRepositories
  ) {}

  public async handle(command: GetLeaseRequestById): Promise<any> {
    try {
      return await this.readLeaseRequestRepo.findLeaseRequestById(command.id);
    } catch (error: any) {
      console.error("fail to get lease request by id !!");
      throw error;
    }
  }
}
