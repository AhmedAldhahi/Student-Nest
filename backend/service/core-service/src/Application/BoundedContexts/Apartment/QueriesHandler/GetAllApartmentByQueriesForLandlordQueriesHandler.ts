import { IReadApartmentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentRepo.repositoreis";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetAllApartmentByQueriesQueries } from "../Queries/GetApartmentByQueries";

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
