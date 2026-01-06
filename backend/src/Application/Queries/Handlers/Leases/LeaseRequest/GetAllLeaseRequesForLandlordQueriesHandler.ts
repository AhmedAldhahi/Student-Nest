import { IReadUserRepositories } from "../../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { IReadLeaseRequestRepositories } from "../../../../../Domain/Modules/Leases/Repositories/Read/ReadLeaseRequestRepositories.repositories";
import { IQueriesHandlers } from "../../../IQueriesHandlers";
import { GetAllLeaseRequestQueries } from "../../../Queries/LeaseRequest/GetAllLeaseRequest";

export class GetAllLeasesRequestQueriesHandler
  implements IQueriesHandlers<GetAllLeaseRequestQueries>
{
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readLeaseRequestRepo: IReadLeaseRequestRepositories
  ) {}
  public async handle(command: GetAllLeaseRequestQueries): Promise<any> {
    try {
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("no user been found !!");

      user.ensureAccountIsActive();

      return await this.readLeaseRequestRepo.findAllLeaseRequestForLandlord(
        command.userId
      );
    } catch (error: any) {
      console.error("get all leases request for single landlord !!");
      throw error;
    }
  }
}
