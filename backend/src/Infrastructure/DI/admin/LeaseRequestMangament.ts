import { GetAllLeaseRequestQueriesHandler } from "../../../Application/Querie/Handlers/GetAllLeaseRequestQueriesHandler";
import { GetLeaseRequestByIDQueriesHandler } from "../../../Application/Querie/Handlers/GetLeaseRequestByIdQueriesHandler";
import { GetAllLeaseRequestUseCase } from "../../../Application/Use-Case/admin/LeaseRequestMangament/getAllLeaseRequest.usecase";
import { GetLeaseRequestByIdUseCase } from "../../../Application/Use-Case/admin/LeaseRequestMangament/getLeaseRequestById.usecase";
import { ReadLeaseRequestRepositories } from "../../Repositories/Read/ReadLeaseRequest.Repositories";

export function GetAllLeaseRequest(): GetAllLeaseRequestUseCase {
  const readLeaseRequestRepo = new ReadLeaseRequestRepositories();
  const queriesHandler = new GetAllLeaseRequestQueriesHandler(
    readLeaseRequestRepo
  );

  return new GetAllLeaseRequestUseCase(queriesHandler);
}

export function GetLeaseRequestById(): GetLeaseRequestByIdUseCase {
  const readLeaseRequest = new ReadLeaseRequestRepositories();
  const queriesHandler = new GetLeaseRequestByIDQueriesHandler(
    readLeaseRequest
  );

  return new GetLeaseRequestByIdUseCase(queriesHandler);
}
