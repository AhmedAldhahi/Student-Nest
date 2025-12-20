import { GetAllLeaseQueriesHandler } from "../../../Application/Querie/Handlers/GetAllLeaseQueriesHandler";
import { GetLeaseByIdQueriesHandler } from "../../../Application/Querie/Handlers/GetLeaseByIdQueriesHandler";
import { FindAllLeaseUseCase } from "../../../Application/Use-Case/admin/LeaseMangament/FindAllLease.usecase";
import { FindLeasesByIdUseCase } from "../../../Application/Use-Case/admin/LeaseMangament/FindLeaseByID.usecase";
import { ReadLeaseRepositories } from "../../Repositories/Read/ReadLeaseRepositories";

export function getAllLease(): FindAllLeaseUseCase {
  const ReadLeaseRepo = new ReadLeaseRepositories();
  const queriesHandler = new GetAllLeaseQueriesHandler(ReadLeaseRepo);

  return new FindAllLeaseUseCase(queriesHandler);
}

export function GetLeaseById(): FindLeasesByIdUseCase {
  const ReadLeaseRepo = new ReadLeaseRepositories();
  const queriesHandler = new GetLeaseByIdQueriesHandler(ReadLeaseRepo);
  return new FindLeasesByIdUseCase(queriesHandler);
}
