import { IReadAuditLogRepositories } from "../../../Domain/Repositories/Read/ReadAuditLogRepo.repositories";
import { IQueriesHandlers } from "../IQueriesHandlers";
import { GetAllAuditLogQueries } from "../Queries/GetAllAuditLog";

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
