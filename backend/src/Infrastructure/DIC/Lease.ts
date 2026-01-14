import { GetAllLeaseForLandlordQueriesHandler } from "../../Application/BoundedContexts/Lease/QueriesHandler/GetAllLeaseForLandlordQueriesHandler";
import { GetAllLeaseForSingleApartmentQueriesHandler } from "../../Application/BoundedContexts/Lease/QueriesHandler/GetAllLeaseForSingleApartmentQueriesHandler";
import { GetAllLeaseQueriesHandler } from "../../Application/BoundedContexts/Lease/QueriesHandler/GetAllLeaseQueriesHandler";
import { GetLeaseByQueryQueriesHandler } from "../../Application/BoundedContexts/Lease/QueriesHandler/GetLeaseByQueryQueriesHandler";
import { GetAllLeaseForLandlordSearchQueriesHandler } from "../../Application/BoundedContexts/Lease/QueriesHandler/SearchForLeaseForLandlordQueriesHandler";
import { SearchForAllLeaseForLandlordForSingleApartmentQueriesHandler } from "../../Application/BoundedContexts/Lease/QueriesHandler/SearchForLeaseForSingleApartmentQueriesHandler";
import { AdminLeaseStrategy } from "../../Application/BoundedContexts/Shared/Strategy/lease/AdminLease.strategy";
import { LandlordLeaseStrategy } from "../../Application/BoundedContexts/Shared/Strategy/lease/LandlordLease.strategy";
import { LeaseContext } from "../../Application/BoundedContexts/Shared/Strategy/lease/LeaseContext";
import { StudentLeaseStrategy } from "../../Application/BoundedContexts/Shared/Strategy/lease/StudentLease.strategy";
import { ReadLeaseRepositories } from "../Repositories/Read/ReadLeaseRepositories";
import { ReadUserRepositories } from "../Repositories/Read/ReadUserRepositories";

export function UserLeaseContext(): LeaseContext {
  // repo
  const ReadLeaseRepo = new ReadLeaseRepositories();
  const readUserRepo = new ReadUserRepositories();

  // query handler
  const queriesHandler = new GetAllLeaseQueriesHandler(ReadLeaseRepo);
  const QueriesHandler = new GetLeaseByQueryQueriesHandler(ReadLeaseRepo);
  const getAllLandlordLeaseQH = new GetAllLeaseForLandlordQueriesHandler(
    ReadLeaseRepo,
    readUserRepo
  );

  const searchForLandlordLeaseQH =
    new GetAllLeaseForLandlordSearchQueriesHandler(readUserRepo, ReadLeaseRepo);

  // strategy

  const adminStrategy = new AdminLeaseStrategy(queriesHandler, QueriesHandler);
  const landlordStrategy = new LandlordLeaseStrategy(
    getAllLandlordLeaseQH,
    searchForLandlordLeaseQH
  );
  const studentStrategy = new StudentLeaseStrategy();

  return new LeaseContext(
    readUserRepo,
    adminStrategy,
    landlordStrategy,
    studentStrategy
  );
}

export function SearchForAllLeaseForSingleApartmentQH(): SearchForAllLeaseForLandlordForSingleApartmentQueriesHandler {
  const userRepo = new ReadUserRepositories();
  const LeaseRepo = new ReadLeaseRepositories();

  return new SearchForAllLeaseForLandlordForSingleApartmentQueriesHandler(
    userRepo,
    LeaseRepo
  );
}

export function GetForAllLeaseForSingleApartmentQH(): GetAllLeaseForSingleApartmentQueriesHandler {
  const userRepo = new ReadUserRepositories();
  const LeaseRepo = new ReadLeaseRepositories();

  return new GetAllLeaseForSingleApartmentQueriesHandler(userRepo, LeaseRepo);
}
