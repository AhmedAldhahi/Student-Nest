import { IReadLandlordRepositories } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadLandlordRepositories.repositoreies";
import { IQueriesHandlers } from "../../../IQueriesHandlers";
import { GetUserQueriesQueries } from "../../../Queries/User/GetUserEmail.Queries";

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
