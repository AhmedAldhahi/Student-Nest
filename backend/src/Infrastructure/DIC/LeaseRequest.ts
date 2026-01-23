import { updateLeaseRequestCommandHandler } from "../../Application/BoundedContexts/LeaseRequest/CommandHandler/ChangeLeaseRequestCommandHandler";
import { CreateLeaseRequestCommandHandler } from "../../Application/BoundedContexts/LeaseRequest/CommandHandler/CreateLeaseRequestCommandHandler";
import { GetAllLeasesRequestForLandlordQueriesHandler } from "../../Application/BoundedContexts/LeaseRequest/QueriesHandler/GetAllLeaseRequesForLandlordQueriesHandler";
import { GetAllLeastRequestForSingleApartmentQueriesHandler } from "../../Application/BoundedContexts/LeaseRequest/QueriesHandler/GetAllLeaseRequestForLandlordForSingleApartmentQueriesHandler";
import { GetAllLeasesRequestForStudentQueriesHandler } from "../../Application/BoundedContexts/LeaseRequest/QueriesHandler/GetAllLeaseRequestForStudentQueriesHandler";
import { GetAllLeaseRequestQueriesHandler } from "../../Application/BoundedContexts/LeaseRequest/QueriesHandler/GetAllLeaseRequestQueriesHandler";
import { GetLeaseRequestByQueryQueriesHandler } from "../../Application/BoundedContexts/LeaseRequest/QueriesHandler/GetLeaseRequestByQueryQueriesHandler";
import { SearchForAllLeaseRequestForLandlordForSingleApartment } from "../../Application/BoundedContexts/LeaseRequest/QueriesHandler/SeachForAllLeasRequestForSingleApartmentQueriesHandler";
import { SearchForLeaseRequestForStudentQueriesHandler } from "../../Application/BoundedContexts/LeaseRequest/QueriesHandler/SearchForAllLeaseRequestForStudentQueriesHandler";
import { SearchForLeaseRequestForLandlordQueriesHandler } from "../../Application/BoundedContexts/LeaseRequest/QueriesHandler/SearchForLeaseRequestForLandlord";
import { AdminLeaseRequestStrategy } from "../../Application/BoundedContexts/Shared/Strategy/leaseRequest/AdminLeaseRequest.strategy";
import { LandlordLeaseRequestStrategy } from "../../Application/BoundedContexts/Shared/Strategy/leaseRequest/LandlordLeaseRequest.strategy";
import { LeaseRequestContext } from "../../Application/BoundedContexts/Shared/Strategy/leaseRequest/LeaseRequestContext";
import { StudentLeaseRequestStrategy } from "../../Application/BoundedContexts/Shared/Strategy/leaseRequest/StudentLeaseRequest.strategy";
import { CreateLeaseRequestEvent } from "../../Domain/BoundedContexts/Leases/Event/LeaseRequestEvent.event";
import { DomainEventDispatcher } from "../../Domain/Shared/Event/DomainEventDispatcher";
import { ReadApartmentRepositories } from "../Repositories/Read/ReadApartmentRepositories";
import { ReadLandlordRepositories } from "../Repositories/Read/ReadLandlordRepositories";
import { ReadLeaseRepositories } from "../Repositories/Read/ReadLeaseRepositories";
import { ReadLeaseRequestRepositories } from "../Repositories/Read/ReadLeaseRequest.Repositories";
import { ReadStudentRepositories } from "../Repositories/Read/ReadStudentRepositories";
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
    readLeaseRequestRepo,
  );
}

export function UserLeaseRequestContext(): LeaseRequestContext {
  const readLeaseRequestRepo = new ReadLeaseRequestRepositories();
  const readUserRepo = new ReadUserRepositories();

  const queriesHandler = new GetAllLeaseRequestQueriesHandler(
    readLeaseRequestRepo,
  );

  const FindSearchQH = new GetLeaseRequestByQueryQueriesHandler(
    readLeaseRequestRepo,
  );

  const GetAllLeaseRequestForLandlordQH =
    new GetAllLeasesRequestForLandlordQueriesHandler(
      readUserRepo,
      readLeaseRequestRepo,
    );

  const searchForLeaseRequestQH =
    new SearchForLeaseRequestForLandlordQueriesHandler(
      readUserRepo,
      readLeaseRequestRepo,
    );

  const GetAllLeaseRequestForStudentQH =
    new GetAllLeasesRequestForStudentQueriesHandler(
      readUserRepo,
      readLeaseRequestRepo,
    );

  const searchForLeaseRequestStudentQH =
    new SearchForLeaseRequestForStudentQueriesHandler(
      readUserRepo,
      readLeaseRequestRepo,
    );

  const adminStrategy = new AdminLeaseRequestStrategy(
    queriesHandler,
    FindSearchQH,
  );

  const landlordStrategy = new LandlordLeaseRequestStrategy(
    GetAllLeaseRequestForLandlordQH,
    searchForLeaseRequestQH,
  );
  const studentStrategy = new StudentLeaseRequestStrategy(
    GetAllLeaseRequestForStudentQH,
    searchForLeaseRequestStudentQH,
  );

  return new LeaseRequestContext(
    readUserRepo,
    adminStrategy,
    landlordStrategy,
    studentStrategy,
  );
}

export function GetAllLeaseRequestForLandlordForSingleApartmentQH(): GetAllLeastRequestForSingleApartmentQueriesHandler {
  const readLeaseRequestRep = new ReadLeaseRequestRepositories();
  const readUserRepo = new ReadUserRepositories();

  return new GetAllLeastRequestForSingleApartmentQueriesHandler(
    readUserRepo,
    readLeaseRequestRep,
  );
}

export function SearchAllLeaseRequestForLandlordForSingleApartmentQH(): SearchForAllLeaseRequestForLandlordForSingleApartment {
  const readLeaseRequestRep = new ReadLeaseRequestRepositories();
  const readUserRepo = new ReadUserRepositories();

  return new SearchForAllLeaseRequestForLandlordForSingleApartment(
    readUserRepo,
    readLeaseRequestRep,
  );
}

export function CreateLeaseRequestCH(): CreateLeaseRequestCommandHandler {
  const userRepo = new ReadUserRepositories();
  const studentRepo = new ReadStudentRepositories();
  const apartmentRepo = new ReadApartmentRepositories();
  const readLeaseRepo = new ReadLeaseRepositories();
  const uow = new UnitOfWork();

  return new CreateLeaseRequestCommandHandler(
    userRepo,
    studentRepo,
    apartmentRepo,
    readLeaseRepo,
    uow,
  );
}
