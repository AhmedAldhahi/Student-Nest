import { GetAllLeaseQueriesHandler } from "../../../Application/Queries/Handlers/GetAllLeaseQueriesHandler";
import { GetLeaseByQueryQueriesHandler } from "../../../Application/Queries/Handlers/GetLeaseByQueryQueriesHandler";
import { FindAllLeaseUseCase } from "../../../Application/Use-Case/admin/LeaseManagement/FindAllLease.usecase";
import { FindLeasesByIdUseCase } from "../../../Application/Use-Case/admin/LeaseManagement/FindLeaseByQuery.usecase";
import { ReadLeaseRepositories } from "../../Repositories/Read/ReadLeaseRepositories";

export function getAllLease(): FindAllLeaseUseCase {
  const ReadLeaseRepo = new ReadLeaseRepositories();
  const queriesHandler = new GetAllLeaseQueriesHandler(ReadLeaseRepo);

  return new FindAllLeaseUseCase(queriesHandler);
}

export function GetLeaseByQuery(): FindLeasesByIdUseCase {
  const ReadLeaseRepo = new ReadLeaseRepositories();
  const queriesHandler = new GetLeaseByQueryQueriesHandler(ReadLeaseRepo);
  return new FindLeasesByIdUseCase(queriesHandler);
}
