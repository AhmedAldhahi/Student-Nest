import { IReadUserRepositories } from "../../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { IReadLeaseRepositories } from "../../../../../Domain/Modules/Leases/Repositories/Read/ReadLeaseRepositories.repositories";
import { IQueriesHandlers } from "../../../IQueriesHandlers";
import { GetAllLeaseForApartmentQueries } from "../../../Queries/Lease/GetAllLeaseForApartment";

export class GetAllLeaseForSingleApartmentQueriesHandler
  implements IQueriesHandlers<GetAllLeaseForApartmentQueries>
{
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readLeaseRepo: IReadLeaseRepositories
  ) {}
  public async handle(command: GetAllLeaseForApartmentQueries): Promise<any> {
    try {
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("no user been found !!");

      user.ensureAccountIsActive();

      return await this.readLeaseRepo.findAllLeaseForLandlordForSingleApartment(
        command.userId,
        command.apartmentId
      );
    } catch (error: any) {
      console.error("fail to get all lease for single apartments !!");
      throw error;
    }
  }
}
