import { GetAllAuditLogQueriesHandler } from "../../../Application/Queries/Handlers/GetAllAuditLogQueriesHandler";
import { GetAuditLogByQueriesHandler } from "../../../Application/Queries/Handlers/GetAuditLogByQueryQueryHandler";
import { FindAllAuditLogUseCase } from "../../../Application/Use-Case/admin/AuditLogMangament/FindAllAuditLog.usecase";
import { GetAuditLogByQueriesUseCase } from "../../../Application/Use-Case/admin/AuditLogMangament/findAuditLogByQuery.usecase";
import { ReadAuditLogRepositories } from "../../Repositories/Read/ReadAuditLogRepositories";

export function findAllAuditLogUseCase(): FindAllAuditLogUseCase {
  const readAuditLogRepo = new ReadAuditLogRepositories();
  const queriesHandler = new GetAllAuditLogQueriesHandler(readAuditLogRepo);

  return new FindAllAuditLogUseCase(queriesHandler);
}

export function FindAuditLogByQueriesUseCase(): GetAuditLogByQueriesUseCase {
  const readAuditLogRepo = new ReadAuditLogRepositories();
  const queriesHandler = new GetAuditLogByQueriesHandler(readAuditLogRepo);
  return new GetAuditLogByQueriesUseCase(queriesHandler);
}
