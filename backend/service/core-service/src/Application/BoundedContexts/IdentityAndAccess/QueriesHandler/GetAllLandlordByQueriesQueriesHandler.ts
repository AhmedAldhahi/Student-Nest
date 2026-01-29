import { IReadLandlordRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadLandlordRepositories.repositoreies";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetUserQueriesQueries } from "../Queries/GetUserByQeries";

export class GetAllLandlordByQueriesQueriesHandler
  implements IQueriesHandlers<GetUserQueriesQueries>
{
  constructor(private readonly readLandlordRepo: IReadLandlordRepositories) {}

  public async handle(command: GetUserQueriesQueries): Promise<any> {
    try {
      const landlords = await this.readLandlordRepo.searchByQuery(
        command.query
      );
      return landlords;
    } catch (error: any) {
      console.error("fail to fetch landlords !!");
      throw error;
    }
  }
}
