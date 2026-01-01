import { IReadApartmentRepo } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadApartmentRepo.repositoreis";
import { IQueriesHandlers } from "../../../IQueriesHandlers";
import { GetAllApartmentByQueriesQueries } from "../../../Queries/Apartment/GetApartmentByQueries";

export class GetAllApartmentByQueryQueriesHandler
  implements IQueriesHandlers<GetAllApartmentByQueriesQueries>
{
  constructor(private readonly ReadApartmentRepo: IReadApartmentRepo) {}

  public async handle(command: GetAllApartmentByQueriesQueries): Promise<any> {
    try {
      return await this.ReadApartmentRepo.findApartmentByQuery(command.name);
    } catch (error: any) {
      console.error("fail to get apartments");
      throw error;
    }
  }
}
