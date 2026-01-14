import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IReadLeaseRequestRepositories } from "../../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRequestRepositories.repositories";
import { GetAllLeaseRequestQueries } from "../Queries/GetAllLeaseRequest";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";

export class GetAllLeasesRequestForLandlordQueriesHandler
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
