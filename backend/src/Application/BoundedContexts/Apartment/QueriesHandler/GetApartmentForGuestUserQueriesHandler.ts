import { IReadApartmentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentRepo.repositoreis";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetApartmentDetailForGuestQueries } from "../Queries/GetAllApartmentForGuest";
export class GetApartmentByIdForGuestQueriesHandler
  implements IQueriesHandlers<GetApartmentDetailForGuestQueries>
{
  constructor(private readonly readApartmentRepo: IReadApartmentRepo) {}

  public async handle(command: GetApartmentDetailForGuestQueries): Promise<any> {
    try {
      return await this.readApartmentRepo.findApartmentDetailsById(command.id);
    } catch (error: any) {
      console.error("fail to get apartment details !!");
      throw error;
    }
  }
}
