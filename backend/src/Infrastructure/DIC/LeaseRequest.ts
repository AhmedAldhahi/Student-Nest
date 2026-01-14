import { updateLeaseRequestCommandHandler } from "../../Application/BoundedContexts/LeaseRequest/CommandHandler/ChangeLeaseRequestCommandHandler";
import { GetAllLeasesRequestForLandlordQueriesHandler } from "../../Application/BoundedContexts/LeaseRequest/QueriesHandler/GetAllLeaseRequesForLandlordQueriesHandler";
import { GetAllLeastRequestForSingleApartmentQueriesHandler } from "../../Application/BoundedContexts/LeaseRequest/QueriesHandler/GetAllLeaseRequestForLandlordForSingleApartmentQueriesHandler";
import { GetAllLeaseRequestQueriesHandler } from "../../Application/BoundedContexts/LeaseRequest/QueriesHandler/GetAllLeaseRequestQueriesHandler";
import { GetLeaseRequestByQueryQueriesHandler } from "../../Application/BoundedContexts/LeaseRequest/QueriesHandler/GetLeaseRequestByQueryQueriesHandler";
import { SearchForAllLeaseRequestForLandlordForSingleApartment } from "../../Application/BoundedContexts/LeaseRequest/QueriesHandler/SeachForAllLeasRequestForSingleApartmentQueriesHandler";
import { SearchForLeaseRequestForLandlordQueriesHandler } from "../../Application/BoundedContexts/LeaseRequest/QueriesHandler/SearchForLeaseRequestForLandlord";
import { AdminLeaseRequestStrategy } from "../../Application/BoundedContexts/Shared/Strategy/leaseRequest/AdminLeaseRequest.strategy";
import { LandlordLeaseRequestStrategy } from "../../Application/BoundedContexts/Shared/Strategy/leaseRequest/LandlordLeaseRequest.strategy";
import { LeaseRequestContext } from "../../Application/BoundedContexts/Shared/Strategy/leaseRequest/LeaseRequestContext";
import { StudentLeaseRequestStrategy } from "../../Application/BoundedContexts/Shared/Strategy/leaseRequest/StudentLeaseRequest.strategy";
import { ReadLandlordRepositories } from "../Repositories/Read/ReadLandlordRepositories";
import { ReadLeaseRequestRepositories } from "../Repositories/Read/ReadLeaseRequest.Repositories";
import { ReadUserRepositories } from "../Repositories/Read/ReadUserRepositories";
import { UnitOfWork } from "../Repositories/unitOfWork.repositories";

export function ChangeLeaseRequestCH(): updateLeaseRequestCommandHandler {
  const uow = new UnitOfWork();
  const readLandlordRepo = new ReadLandlordRepositories();
  const readUserRepo = new ReadUserRepositories();
  const readLeaseRequestRepo = new ReadLeaseRequestRepositories();

  return new updateLeaseRequestCommandHandler(
    uow,
    readUserRepo,
    readLandlordRepo,
    readLeaseRequestRepo
  );
}

export function UserLeaseRequestContext(): LeaseRequestContext {
  const readLeaseRequestRepo = new ReadLeaseRequestRepositories();
  const readUserRepo = new ReadUserRepositories();

  const queriesHandler = new GetAllLeaseRequestQueriesHandler(
    readLeaseRequestRepo
  );

  const FindSearchQH = new GetLeaseRequestByQueryQueriesHandler(
    readLeaseRequestRepo
  );

  const GetAllLeaseRequestForLandlordQH = new GetAllLeasesRequestForLandlordQueriesHandler(
    readUserRepo,
    readLeaseRequestRepo
  );

  const searchForLeaseRequestQH =
    new SearchForLeaseRequestForLandlordQueriesHandler(
      readUserRepo,
      readLeaseRequestRepo
    );

  const adminStrategy = new AdminLeaseRequestStrategy(
    queriesHandler,
    FindSearchQH
  );

  const landlordStrategy = new LandlordLeaseRequestStrategy(
    GetAllLeaseRequestForLandlordQH,
    searchForLeaseRequestQH
  );
  const studentStrategy = new StudentLeaseRequestStrategy();

  return new LeaseRequestContext(
    readUserRepo,
    adminStrategy,
    landlordStrategy,
    studentStrategy
  );
}

export function GetAllLeaseRequestForLandlordForSingleApartmentQH(): GetAllLeastRequestForSingleApartmentQueriesHandler {
  const readLeaseRequestRep = new ReadLeaseRequestRepositories();
  const readUserRepo = new ReadUserRepositories();

  return new GetAllLeastRequestForSingleApartmentQueriesHandler(
    readUserRepo,
    readLeaseRequestRep
  );
}

export function SearchAllLeaseRequestForLandlordForSingleApartmentQH(): SearchForAllLeaseRequestForLandlordForSingleApartment {
  const readLeaseRequestRep = new ReadLeaseRequestRepositories();
  const readUserRepo = new ReadUserRepositories();

  return new SearchForAllLeaseRequestForLandlordForSingleApartment(
    readUserRepo,
    readLeaseRequestRep
  );
}
