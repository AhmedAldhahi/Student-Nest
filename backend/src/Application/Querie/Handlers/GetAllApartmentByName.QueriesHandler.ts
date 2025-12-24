import { IReadApartmentRepo } from "../../../Domain/Repositories/Read/ReadApartmentRepo.repositoreis";
import { IQueriesHandlers } from "../IQuerieHandlers";
import { GetAllApartmentByTitleQueries } from "../Queries/GetApartmentByName";

export class GetAllApartmentByTitleQueriesHandler
  implements IQueriesHandlers<GetAllApartmentByTitleQueries>
{
  constructor(private readonly ReadApartmentRepo: IReadApartmentRepo) {}

  public async handle(command: GetAllApartmentByTitleQueries): Promise<any> {
    try {
      return await this.ReadApartmentRepo.findApartmentTitle(command.name);
    } catch (error: any) {
      console.error("fail to get apartments");
      throw error;
    }
  }
}
