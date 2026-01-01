import { IReadApartmentRepo } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadApartmentRepo.repositoreis";
import { IQueriesHandlers } from "../../../IQueriesHandlers";
import { GetAllApartmentQueries } from "../../../Queries/Apartment/GetAllApartment";

export class GetAllApartmentQueriesHandler
  implements IQueriesHandlers<GetAllApartmentQueries>
{
  constructor(private readonly ReadApartmentRepo: IReadApartmentRepo) {}

  public async handle(command: GetAllApartmentQueries): Promise<any> {
    try {
      return await this.ReadApartmentRepo.findAllApartment(command.userId);
    } catch (error: any) {
      console.error("fail to get all apartments !!");
      throw error;
    }
  }
}
