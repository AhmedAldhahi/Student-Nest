import { IReadUserRepositories } from "../../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { IReadLeaseRepositories } from "../../../../../Domain/Modules/Leases/Repositories/Read/ReadLeaseRepositories.repositories";
import { IQueriesHandlers } from "../../../IQueriesHandlers";
import { GetLeaseByQueryQueries } from "../../../Queries/Lease/GetLeaseByQuery.Queries";

export class GetAllLeaseForLandlordSearchQueriesHandler
  implements IQueriesHandlers<GetLeaseByQueryQueries>
{
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readLeaseRepo: IReadLeaseRepositories
  ) {}

  public async handle(command: GetLeaseByQueryQueries): Promise<any> {
    try {
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("no user been found !!");

      user.ensureAccountIsActive();

   

      return await this.readLeaseRepo.findAllLeaseForLandlordSearch(
        command.userId,
        command.Query
      );
    } catch (error: any) {
      console.error("fail to get leases for landlord !!");
      throw error;
    }
  }
}
