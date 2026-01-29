import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IReadLeaseRepositories } from "../../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRepositories.repositories";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetAllLeaseQueries } from "../Queries/GetAllLease";

export class GetAllLeaseForLandlordQueriesHandler
  implements IQueriesHandlers<GetAllLeaseQueries>
{
  constructor(
    private readonly ReadLeaseRepo: IReadLeaseRepositories,
    private readonly readUserRepo: IReadUserRepositories
  ) {}

  public async handle(Queries: GetAllLeaseQueries): Promise<any> {
    try {
      const user = await this.readUserRepo.findById(Queries.userId);
      if (!user) throw new Error("no user been found !!");

      user.ensureAccountIsActive();

      return await this.ReadLeaseRepo.findAllLeaseForLandlord(
        Queries.userId,
      );

    } catch (error: any) {
      console.error("fail to fetch lease for this apartments !!");
      throw error;
    }
  }
}
