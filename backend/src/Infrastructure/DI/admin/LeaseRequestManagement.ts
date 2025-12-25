import { GetAllLeaseRequestQueriesHandler } from "../../../Application/Queries/Handlers/GetAllLeaseRequestQueriesHandler";
import { GetLeaseRequestByQueryQueriesHandler } from "../../../Application/Queries/Handlers/GetLeaseRequestByQueryQueriesHandler";
import { GetAllLeaseRequestUseCase } from "../../../Application/Use-Case/admin/LeaseRequestManagement/getAllLeaseRequest.usecase";
import { GetLeaseRequestByQueryUseCase } from "../../../Application/Use-Case/admin/LeaseRequestManagement/getLeaseRequestByQuery.usecase";
import { ReadLeaseRequestRepositories } from "../../Repositories/Read/ReadLeaseRequest.Repositories";

export function GetAllLeaseRequest(): GetAllLeaseRequestUseCase {
  const readLeaseRequestRepo = new ReadLeaseRequestRepositories();
  const queriesHandler = new GetAllLeaseRequestQueriesHandler(
    readLeaseRequestRepo
  );

  return new GetAllLeaseRequestUseCase(queriesHandler);
}

export function GetLeaseRequestByQuery(): GetLeaseRequestByQueryUseCase {
  const readLeaseRequest = new ReadLeaseRequestRepositories();
  const queriesHandler = new GetLeaseRequestByQueryQueriesHandler(
    readLeaseRequest
  );

  return new GetLeaseRequestByQueryUseCase(queriesHandler);
}
