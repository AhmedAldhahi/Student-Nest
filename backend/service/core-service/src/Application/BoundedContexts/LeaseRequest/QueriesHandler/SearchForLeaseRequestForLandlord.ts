import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IReadLeaseRequestRepositories } from "../../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRequestRepositories.repositories";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetLeaseRequestByQuery } from "../Queries/GetLeaseRequestByQuery.Queries";

export class SearchForLeaseRequestForLandlordQueriesHandler
  implements IQueriesHandlers<GetLeaseRequestByQuery>
{
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readLeaseRequestRepo: IReadLeaseRequestRepositories
  ) {}

  public async handle(command: GetLeaseRequestByQuery): Promise<any> {
    try {
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("no user been found !!");

      return await this.readLeaseRequestRepo.SearchForLeaseRequestForLandlord(
        command.userId,
        command.Query
      );
    } catch (error: any) {
      console.log("fail to search for leases Request !!");
      throw error;
    }
  }
}
