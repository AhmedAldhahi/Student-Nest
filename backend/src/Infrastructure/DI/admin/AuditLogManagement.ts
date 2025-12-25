import { GetAllAuditLogQueriesHandler } from "../../../Application/Queries/Handlers/GetAllAuditLogQueriesHandler";
import { FindAllAuditLogUseCase } from "../../../Application/Use-Case/admin/AuditLogMangament/FindAllAuditLog.usecase";
import { ReadAuditLogRepositories } from "../../Repositories/Read/ReadAuditLogRepositories";

export function findAllAuditLogUseCase(): FindAllAuditLogUseCase {
  const readAuditLogRepo = new ReadAuditLogRepositories();
  const queriesHandler = new GetAllAuditLogQueriesHandler(readAuditLogRepo);

  return new FindAllAuditLogUseCase(queriesHandler);
}
