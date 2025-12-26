import { IReadAuditLogRepositories } from "../../../Domain/Repositories/Read/ReadAuditLogRepo.repositories";
import { IQueriesHandlers } from "../IQueriesHandlers";
import { GetAuditLogByQueries } from "../Queries/GetAuditLogByQueries";

export class GetAuditLogByQueriesHandler
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
