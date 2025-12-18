import { IReadLandlordRepositories } from "../../../Domain/Repositories/Read/ReadLandlordRepositories.repositoreies";
import { LandlordResponseDTO } from "../../Dtos/profile/LandlordResponeDTO";
import { IQueriesHandlers } from "../IQuerieHandlers";
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
