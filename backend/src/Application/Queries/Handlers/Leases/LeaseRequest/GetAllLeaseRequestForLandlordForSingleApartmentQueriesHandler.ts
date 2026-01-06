import { IReadUserRepositories } from "../../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { IReadLeaseRequestRepositories } from "../../../../../Domain/Modules/Leases/Repositories/Read/ReadLeaseRequestRepositories.repositories";
import { IQueriesHandlers } from "../../../IQueriesHandlers";
import { GetAllLeastRequestForSingleApartmentQueries } from "../../../Queries/LeaseRequest/GetAllLeastRequestForSingleApartmentQueries";

export class GetAllLeastRequestForSingleApartmentQueriesHandler
  implements IQueriesHandlers<GetAllLeastRequestForSingleApartmentQueries>
{
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readLeaseRequestRepo: IReadLeaseRequestRepositories
  ) {}

  public async handle(
    command: GetAllLeastRequestForSingleApartmentQueries
  ): Promise<any> {
    try {
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("no user been found !!");

      user.ensureAccountIsActive();

      return await this.readLeaseRequestRepo.findAllLeaseRequestForLandlordForSingleApartment(
        command.userId,
        command.apartmentId
      );
    } catch (error: any) {
      console.log("fail to get all least request for single apartments !!");
      throw error;
    }
  }
}
