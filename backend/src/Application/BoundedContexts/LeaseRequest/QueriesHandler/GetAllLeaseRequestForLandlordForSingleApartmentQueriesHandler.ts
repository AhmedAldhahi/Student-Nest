import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IReadLeaseRequestRepositories } from "../../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRequestRepositories.repositories";
import { GetAllLeastRequestForSingleApartmentQueries } from "../Queries/GetAllLeastRequestForSingleApartmentQueries";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";

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
