import { IReadUserRepositories } from "../../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { IReadLeaseRepositories } from "../../../../../Domain/Modules/Leases/Repositories/Read/ReadLeaseRepositories.repositories";
import { IQueriesHandlers } from "../../../IQueriesHandlers";
import { SearchForAllLeaseForLandlordForSingleApartmentQueries } from "../../../Queries/Lease/SearchForAllLeaseForLandlordForSingleApartment";

export class SearchForAllLeaseForLandlordForSingleApartment
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
