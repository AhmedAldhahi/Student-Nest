import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IReadLeaseRequestRepositories } from "../../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRequestRepositories.repositories";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { SearchForLeastRequestForSingleApartmentQueries } from "../Queries/SeachForLeaseRequestForSingleApartmet";

export class SearchForAllLeaseRequestForLandlordForSingleApartment
  implements IQueriesHandlers<SearchForLeastRequestForSingleApartmentQueries>
{
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readLeaseRequestRepo: IReadLeaseRequestRepositories
  ) {}

  public async handle(
    command: SearchForLeastRequestForSingleApartmentQueries
  ): Promise<any> {
    try {
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("no user been found !!");

      user.ensureAccountIsActive();

      return await this.readLeaseRequestRepo.SearchForLeaseRequestForLandlordForSingleApartment(
        command.userId,
        command.apartmentId,
        command.queries
      );
    } catch (error: any) {
      console.error("fail to search for leases requests !!");
      throw error;
    }
  }
}
