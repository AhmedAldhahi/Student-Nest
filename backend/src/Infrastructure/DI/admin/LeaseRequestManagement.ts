import { GetAllLeasesRequestQueriesHandler } from "../../../Application/Queries/Handlers/Leases/LeaseRequest/GetAllLeaseRequesForLandlordQueriesHandler";
import { GetAllLeaseRequestQueriesHandler } from "../../../Application/Queries/Handlers/Leases/LeaseRequest/GetAllLeaseRequestQueriesHandler";
import { GetLeaseRequestByQueryQueriesHandler } from "../../../Application/Queries/Handlers/Leases/LeaseRequest/GetLeaseRequestByQueryQueriesHandler";
import { AdminLeaseRequestStrategy } from "../../../Application/Strategy/leaseRequest/AdminLeaseRequest.strategy";
import { LandlordLeaseRequestStrategy } from "../../../Application/Strategy/leaseRequest/LandlordLeaseRequest.strategy";
import { LeaseRequestContext } from "../../../Application/Strategy/leaseRequest/LeaseRequestContext";
import { StudentLeaseRequestStrategy } from "../../../Application/Strategy/leaseRequest/StudentLeaseRequest.strategy";
import { GetAllLeaseRequestUseCase } from "../../../Application/Use-Case/admin/LeaseRequestManagement/getAllLeaseRequest.usecase";
import { GetLeaseRequestByQueryUseCase } from "../../../Application/Use-Case/admin/LeaseRequestManagement/getLeaseRequestByQuery.usecase";
import { ReadLeaseRequestRepositories } from "../../Repositories/Read/ReadLeaseRequest.Repositories";
import { ReadUserRepositories } from "../../Repositories/Read/ReadUserRepositories";

export function GetAllLeaseRequest(): GetAllLeaseRequestUseCase {
  const readLeaseRequestRepo = new ReadLeaseRequestRepositories();
  const readUserRepo = new ReadUserRepositories();

  const queriesHandler = new GetAllLeaseRequestQueriesHandler(
    readLeaseRequestRepo
  );

  const FindSearchQH = new GetLeaseRequestByQueryQueriesHandler(
    readLeaseRequestRepo
  );

  const GetAllLeaseRequestForLandlordQH = new GetAllLeasesRequestQueriesHandler(
    readUserRepo,
    readLeaseRequestRepo
  );

  const adminStrategy = new AdminLeaseRequestStrategy(
    queriesHandler,
    FindSearchQH
  );

  const landlordStrategy = new LandlordLeaseRequestStrategy(
    GetAllLeaseRequestForLandlordQH
  );
  const studentStrategy = new StudentLeaseRequestStrategy();

  const leaseRequestContext = new LeaseRequestContext(
    adminStrategy,
    landlordStrategy,
    studentStrategy
  );

  return new GetAllLeaseRequestUseCase(leaseRequestContext, readUserRepo);
}

export function GetLeaseRequestByQuery(): GetLeaseRequestByQueryUseCase {
  // read repo
  const readLeaseRequest = new ReadLeaseRequestRepositories();
  const readUserRepo = new ReadUserRepositories();

  // Query handler

  const queriesHandler = new GetAllLeaseRequestQueriesHandler(readLeaseRequest);

  const FindSearchQH = new GetLeaseRequestByQueryQueriesHandler(
    readLeaseRequest
  );

  const GetAllLeaseRequestForLandlordQH = new GetAllLeasesRequestQueriesHandler(
    readUserRepo,
    readLeaseRequest
  );

  // strategy

  const adminStrategy = new AdminLeaseRequestStrategy(
    queriesHandler,
    FindSearchQH
  );

  const landlordStrategy = new LandlordLeaseRequestStrategy(
    GetAllLeaseRequestForLandlordQH
  );

  const StudentLeaseRequest = new StudentLeaseRequestStrategy();

  // context

  const leaseRequestContext = new LeaseRequestContext(
    adminStrategy,
    landlordStrategy,
    StudentLeaseRequest
  );

  return new GetLeaseRequestByQueryUseCase(leaseRequestContext, readUserRepo);
}
