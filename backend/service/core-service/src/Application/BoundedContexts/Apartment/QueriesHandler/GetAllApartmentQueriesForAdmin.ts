import { IReadApartmentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentRepo.repositoreis";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetAllApartmentByQueriesQueries } from "../Queries/GetApartmentByQueries";

export class GetAllApartmentByQueryForAdminQueriesHandler
  implements IQueriesHandlers<GetAllApartmentByQueriesQueries>
{
  constructor(private readonly ReadApartmentRepo: IReadApartmentRepo) {}

  public async handle(command: GetAllApartmentByQueriesQueries): Promise<any> {
    try {
      return await this.ReadApartmentRepo.findApartmentByQuery(command.name,command.userId);
    } catch (error: any) {
      console.error("fail to get apartments");
      throw error;
    }
  }
}
