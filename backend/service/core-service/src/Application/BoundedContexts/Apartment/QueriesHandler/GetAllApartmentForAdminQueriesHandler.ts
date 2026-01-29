import { IReadApartmentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentRepo.repositoreis";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetAllApartmentQueries } from "../Queries/GetAllApartment";

export class GetAllApartmentForAdminQueriesHandler
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
