import { IReadAuditLogRepositories } from "../../../../../Domain/Modules/adminstration/Repositories/ReadAuditLogRepo.repositories";
import { IQueriesHandlers } from "../../../IQueriesHandlers";
import { GetAllAuditLogQueries } from "../../../Queries/AuditLog/GetAllAuditLog";

export class GetAllAuditLogQueriesHandler
  implements IQueriesHandlers<GetAllAuditLogQueries>
{
  constructor(private readonly readAuditLogRepo: IReadAuditLogRepositories) {}

  public async handle(): Promise<any> {
    try {
      return await this.readAuditLogRepo.findAll();
    } catch (error: any) {
      console.error("fail to get all audit log !!");
    }
  }
}
