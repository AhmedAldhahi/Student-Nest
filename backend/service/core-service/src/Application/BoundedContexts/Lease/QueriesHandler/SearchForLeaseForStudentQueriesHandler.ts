import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IReadLeaseRepositories } from "../../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRepositories.repositories";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetLeaseByQueryQueries } from "../Queries/GetLeaseByQuery.Queries";

export class GetAllLeaseForStudentSearchQueriesHandler
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

      return await this.readLeaseRepo.findAllLeaseForStudentSearch(
        command.userId,
        command.Query
      );
    } catch (error: any) {
      console.error("fail to get leases for landlord !!");
      throw error;
    }
  }
}
