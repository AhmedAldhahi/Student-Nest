import { GetAuditLogByQueriesHandler } from "../../../Queries/Handlers/Adminstrator/AuditLog/GetAuditLogByQueryQueryHandler";
import { GetAuditLogByQueries } from "../../../Queries/Queries/AuditLog/GetAuditLogByQueries";
export class GetAuditLogByQueriesUseCase {
  constructor(private readonly commandHandler: GetAuditLogByQueriesHandler) {}

  public async execute(query: string) {
    try {
      const Queries = new GetAuditLogByQueries(query);
      return await this.commandHandler.handle(Queries);
    } catch (error: any) {
      console.error("fail to get audit logs !!");
      throw error;
    }
  }
}
