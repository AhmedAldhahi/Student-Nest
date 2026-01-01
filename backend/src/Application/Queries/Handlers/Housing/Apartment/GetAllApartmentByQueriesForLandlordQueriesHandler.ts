import { IReadApartmentRepo } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadApartmentRepo.repositoreis";
import { IQueriesHandlers } from "../../../IQueriesHandlers";
import { GetAllApartmentByQueriesQueries } from "../../../Queries/Apartment/GetApartmentByQueries";

export class GetAllApartmentByQueriesForLandlordQueriesHandler
  implements IQueriesHandlers<GetAllApartmentByQueriesQueries>
{
  constructor(private readonly readApartmentRepo: IReadApartmentRepo) {}

  public async handle(command: GetAllApartmentByQueriesQueries): Promise<any> {
    try {
      return await this.readApartmentRepo.findApartmentByQueryForLandlord(
        command.name,
        command.userId
      );
    } catch (error: any) {
      console.error("fail to get apartments !!");
      throw error;
    }
  }
}
