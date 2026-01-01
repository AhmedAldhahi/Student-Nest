import { GetAllLeaseQueriesHandler } from "../../../Application/Queries/Handlers/Leases/Lease/GetAllLeaseQueriesHandler";
import { GetLeaseByQueryQueriesHandler } from "../../../Application/Queries/Handlers/Leases/Lease/GetLeaseByQueryQueriesHandler";
import { AdminLeaseStrategy } from "../../../Application/Strategy/lease/AdminLease.strategy";
import { LandlordLeaseStrategy } from "../../../Application/Strategy/lease/LandlordLease.strategy";
import { LeaseContext } from "../../../Application/Strategy/lease/LeaseContext";
import { StudentLeaseStrategy } from "../../../Application/Strategy/lease/StudentLease.strategy";
import { FindAllLeaseUseCase } from "../../../Application/Use-Case/admin/LeaseManagement/FindAllLease.usecase";
import { FindLeasesByIdUseCase } from "../../../Application/Use-Case/admin/LeaseManagement/FindLeaseByQuery.usecase";
import { ReadLeaseRepositories } from "../../Repositories/Read/ReadLeaseRepositories";
import { ReadUserRepositories } from "../../Repositories/Read/ReadUserRepositories";

export function getAllLease(): FindAllLeaseUseCase {
  // repo
  const ReadLeaseRepo = new ReadLeaseRepositories();
  const readUserRepo = new ReadUserRepositories();

  // query handler
  const queriesHandler = new GetAllLeaseQueriesHandler(ReadLeaseRepo);
  const QueriesHandler = new GetLeaseByQueryQueriesHandler(ReadLeaseRepo);

  // strategy

  const adminStrategy = new AdminLeaseStrategy(queriesHandler, QueriesHandler);
  const landlordStrategy = new LandlordLeaseStrategy();
  const studentStrategy = new StudentLeaseStrategy();

  const context = new LeaseContext(
    adminStrategy,
    landlordStrategy,
    studentStrategy
  );

  return new FindAllLeaseUseCase(context, readUserRepo);
}

export function GetLeaseByQuery(): FindLeasesByIdUseCase {
  // repo
  const ReadLeaseRepo = new ReadLeaseRepositories();
  const readUserRepo = new ReadUserRepositories();

  // query handler
  const queriesHandler = new GetAllLeaseQueriesHandler(ReadLeaseRepo);
  const QueriesHandler = new GetLeaseByQueryQueriesHandler(ReadLeaseRepo);

  // strategy

  const adminStrategy = new AdminLeaseStrategy(queriesHandler, QueriesHandler);
  const landlordStrategy = new LandlordLeaseStrategy();
  const studentStrategy = new StudentLeaseStrategy();

  const context = new LeaseContext(
    adminStrategy,
    landlordStrategy,
    studentStrategy
  );

  return new FindLeasesByIdUseCase(context, readUserRepo);
}
