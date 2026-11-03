import { IReadAuditLogRepositories } from "../../../../Domain/BoundedContexts/adminstration/Repositories/ReadAuditLogRepo.repositories";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetAuditLogByQueries } from "../Queries/SearchForAuditLogByQeuries";

export class SearchForAuditLogByQueriesHandler
  implements IQueriesHandlers<GetAuditLogByQueries>
{
  constructor(private readonly ReadAuditLogRepo: IReadAuditLogRepositories) {}
  public async handle(command: GetAuditLogByQueries): Promise<any> {
    try {
      return await this.ReadAuditLogRepo.findByUserQuery(command.query);
    } catch (error: any) {
        console.error("fail to get audit log !!");
        throw error;
    }
  }
}
