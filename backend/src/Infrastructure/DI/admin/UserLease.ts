import { GetAllLeaseQueriesHandler } from "../../../Application/Querie/Handlers/GetAllLeaseQueriesHandler";
import { FindAllLeaseUseCase } from "../../../Application/Use-Case/admin/LeaseMangament/FindAllLease.usecase";
import { ReadLeaseRepositories } from "../../Repositories/Read/ReadLeaseRepositories";

export function getAllLease(): FindAllLeaseUseCase {
  const ReadLeaseRepo = new ReadLeaseRepositories();
  const queriesHandler = new GetAllLeaseQueriesHandler(ReadLeaseRepo);

  return new FindAllLeaseUseCase(queriesHandler);
}
