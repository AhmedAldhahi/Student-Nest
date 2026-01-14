import { IReadLandlordRepositories, LandlordResponseDTO } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadLandlordRepositories.repositoreies";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetAllUser } from "../Queries/GetAllUser";

export class GetAllLandlordQueriesHandler
  implements IQueriesHandlers<GetAllUser>
{
  constructor(private readonly ReadLandlord: IReadLandlordRepositories) {}

  public async handle(): Promise<LandlordResponseDTO[]|null> {
    try {
      const landlords = await this.ReadLandlord.findAllLandlord();

      return landlords;
    } catch (error: any) {
      console.error("fail to fetch landlords !!");
      throw error;
    }
  }
}
