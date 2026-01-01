import { IReadApartmentRepo } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadApartmentRepo.repositoreis";
import { IQueriesHandlers } from "../../../IQueriesHandlers";
import { GetAllApartmentForLandlord } from "../../../Queries/Apartment/GetAllApartmemtForLandlord";

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
