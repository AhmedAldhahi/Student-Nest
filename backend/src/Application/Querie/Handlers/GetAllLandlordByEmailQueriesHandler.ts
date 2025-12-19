import { IReadLandlordRepositories } from "../../../Domain/Repositories/Read/ReadLandlordRepositories.repositoreies";
import { IQueriesHandlers } from "../IQuerieHandlers";
import { GetUserEmailQueries } from "../Queries/GetUserEmail.Queries";

export class GetAllLandlordByEmailQueriesHandler
  implements IQueriesHandlers<GetUserEmailQueries>
{
  constructor(private readonly readLandlordRepo: IReadLandlordRepositories) {}

  public async handle(command: GetUserEmailQueries): Promise<any> {
    try {
      const landlords = await this.readLandlordRepo.searchByEmail(
        command.email
      );
      return landlords;
    } catch (error: any) {
      console.error("fail to fetch landlords !!");
      throw error;
    }
  }
}
