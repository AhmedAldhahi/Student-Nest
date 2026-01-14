import { IReadAuditLogRepositories } from "../../../../Domain/BoundedContexts/adminstration/Repositories/ReadAuditLogRepo.repositories";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetAllAuditLogQueries } from "../Queries/GetAllAuditLogQueries";

export class GetAllAuditLogQueriesHandler
  implements IQueriesHandlers<GetAllAuditLogQueries>
{
  constructor(private readonly readAuditLogRepo: IReadAuditLogRepositories) {}

  public async handle() : Promise<any> {
    try {
      return await this.readAuditLogRepo.findAll();
    } catch (error: any) {
      console.error("fail to get all audit log !!");
      throw error;
    }
  }
}
