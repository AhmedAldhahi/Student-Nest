import { IReadApartmentRepo } from "../../../Domain/Repositories/Read/ReadApartmentRepo.repositoreis";
import { IQueriesHandlers } from "../IQuerieHandlers";
import { GetAllApartmentQueries } from "../Queries/GetAllApartment";

export class GetAllApartmentQueriesHandler
  implements IQueriesHandlers<GetAllApartmentQueries>
{
  constructor(private readonly ReadApartmentRepo: IReadApartmentRepo) {}

  public async handle(): Promise<any> {
    try {
      return await this.ReadApartmentRepo.findAllApartment();
    } catch (error: any) {
      console.error("fail to get all apartments !!");
      throw error;
    }
  }
}
