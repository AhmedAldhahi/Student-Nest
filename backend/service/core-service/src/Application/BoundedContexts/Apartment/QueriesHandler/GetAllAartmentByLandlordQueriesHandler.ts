import { IReadApartmentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentRepo.repositoreis";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetAllApartmentForLandlord } from "../Queries/GetAllApartmemtForLandlord";

export class GetAllApartmentByLandlordQueriesHandler
  implements IQueriesHandlers<GetAllApartmentForLandlord>
{
  constructor(private readonly ReadApartmentRepo: IReadApartmentRepo) {}

  public async handle(command: GetAllApartmentForLandlord): Promise<any> {
    try {
      return await this.ReadApartmentRepo.findAllApartmentForLandlord(
        command.userId
      );
    } catch (error: any) {
      console.error("fail to get apartments !!");
      throw error;
    }
  }
}
