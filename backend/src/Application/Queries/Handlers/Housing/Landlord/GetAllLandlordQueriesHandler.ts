import { IReadLandlordRepositories } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadLandlordRepositories.repositoreies";
import { LandlordResponseDTO } from "../../../../DTO/shared/profile/LandlordResponeDTO";
import { IQueriesHandlers } from "../../../IQueriesHandlers";
import { GetAllUser } from "../../../Queries/User/GetAllUser";

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
