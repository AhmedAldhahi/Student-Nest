import { IReadApartmentRepo } from "../../../Domain/Repositories/Read/ReadApartmentRepo.repositoreis";
import { IQueriesHandlers } from "../IQueriesHandlers";
import { GetAllApartmentByTitleQueries } from "../Queries/GetApartmentByName";

export class GetAllApartmentByQueryQueriesHandler
  implements IQueriesHandlers<GetAllApartmentByTitleQueries>
{
  constructor(private readonly ReadApartmentRepo: IReadApartmentRepo) {}

  public async handle(command: GetAllApartmentByTitleQueries): Promise<any> {
    try {
      return await this.ReadApartmentRepo.findApartmentByQuery(command.name);
    } catch (error: any) {
      console.error("fail to get apartments");
      throw error;
    }
  }
}
