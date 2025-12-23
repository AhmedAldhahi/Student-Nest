import { IReadApartmentRepo } from "../../../Domain/Repositories/Read/ReadApartmentRepo.repositoreis";
import { IQueriesHandlers } from "../IQuerieHandlers";
import { GetAllApartmentByNameQueries } from "../Queries/GetApartmentByName";

export class GetAllApartmentByNameQueriesHandler
  implements IQueriesHandlers<GetAllApartmentByNameQueries>
{
  constructor(private readonly ReadApartmentRepo: IReadApartmentRepo) {}

  public async handle(command: GetAllApartmentByNameQueries): Promise<any> {
    try {
      return await this.ReadApartmentRepo.findApartmentName(command.name);
    } catch (error: any) {
      console.error("fail to get apartments");
      throw error;
    }
  }
}
