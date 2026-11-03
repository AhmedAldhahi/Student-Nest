import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IReadLeaseRepositories } from "../../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRepositories.repositories";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { SearchForAllLeaseForLandlordForSingleApartmentQueries } from "../Queries/SearchForAllLeaseForLandlordForSingleApartment";

export class SearchForAllLeaseForLandlordForSingleApartmentQueriesHandler
  implements
    IQueriesHandlers<SearchForAllLeaseForLandlordForSingleApartmentQueries>
{
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readLeaseRepo: IReadLeaseRepositories
  ) {}

  public async handle(
    command: SearchForAllLeaseForLandlordForSingleApartmentQueries
  ): Promise<any> {
    try {
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("no user been found !!");

      user.ensureAccountIsActive();

      return await this.readLeaseRepo.findAllLeaseForLandlordForSingleApartmentByQueries(
        command.userId,
        command.apartmentId,
        command.queries
      );
    } catch (error: any) {
      console.error("fail to search  leases for single apartments !!");
      throw error;
    }
  }
}
