import { ChangeLandlordVerificationStatusCommandHandler } from "../../Application/BoundedContexts/Adminstration/CommandHandler/ChangeLandlordVerificationStatusCommandHandler";
import { ChangeUserActivateStatusCommandHandler } from "../../Application/BoundedContexts/Adminstration/CommandHandler/ChangeUserActivateStatus.CommandHandler";
import { ChangeApartmentStatusVerifiedCommandHandler } from "../../Application/BoundedContexts/Adminstration/CommandHandler/ChnageApartmentVerificationStatusCommandHandler";
import { DeleteApartmentByIdForAdminCommandHandler } from "../../Application/BoundedContexts/Adminstration/CommandHandler/DeleteApartmentByIdForAdminCommandHandler";
import { DeleteUserCommandHandler } from "../../Application/BoundedContexts/Adminstration/CommandHandler/DeleteUserCommand";
import { RemoveCashHandler } from "../../Application/BoundedContexts/Adminstration/EventHandler/RemoveCashHandler";
import { GetAllAuditLogQueriesHandler } from "../../Application/BoundedContexts/Adminstration/QueriesHandler/GetAllAuditLogQueries";
import { SearchForAuditLogByQueriesHandler } from "../../Application/BoundedContexts/Adminstration/QueriesHandler/SeachForAuditLogQueriesHandler";
import { UpdateUserEvent } from "../../Domain/BoundedContexts/IdentityAndAccess/Events/UpdateUserEvent.event";
import { DomainEventDispatcher } from "../../Domain/Shared/Event/DomainEventDispatcher";
import { InMemoryEventBus } from "../EventBus/InMemmoryEventBus";
import { ReadApartmentRepositories } from "../Repositories/Read/ReadApartmentRepositories";
import { ReadAuditLogRepositories } from "../Repositories/Read/ReadAuditLogRepositories";
import { ReadLandlordRepositories } from "../Repositories/Read/ReadLandlordRepositories";
import { ReadUserRepositories } from "../Repositories/Read/ReadUserRepositories";
import { UnitOfWork } from "../Repositories/unitOfWork.repositories";
import { RedisCashService } from "../Services/Cashing/RadisCashe";
import { CloudinaryService } from "../Services/media/CloudinaryService.service";

export function ChangeLandlordVerificationStatusCH(): ChangeLandlordVerificationStatusCommandHandler {
  const uow = new UnitOfWork();
  const readLandlordRepo = new ReadLandlordRepositories();

  const cashService = new RedisCashService();

  const eventDispatch = new DomainEventDispatcher();
  const cashHandler = new RemoveCashHandler(cashService);

  eventDispatch.register(UpdateUserEvent.EVENT_KEY, cashHandler);

  const eventBus = new InMemoryEventBus(eventDispatch);

  return new ChangeLandlordVerificationStatusCommandHandler(
    readLandlordRepo,
    uow,
    eventBus
  );
}

export function ChangeUserActivityStatusCH(): ChangeUserActivateStatusCommandHandler {
  const uow = new UnitOfWork();
  const readUserRepo = new ReadUserRepositories();

  return new ChangeUserActivateStatusCommandHandler(uow, readUserRepo);
}

export function ChangeApartmentVerificationStatusCH(): ChangeApartmentStatusVerifiedCommandHandler {
  const uow = new UnitOfWork();
  const readApartmentRepo = new ReadApartmentRepositories();

  return new ChangeApartmentStatusVerifiedCommandHandler(
    uow,
    readApartmentRepo
  );
}

export function DeleteApartmentByIdForAdminCH(): DeleteApartmentByIdForAdminCommandHandler {
  const uow = new UnitOfWork();
  const readApartmentRepo = new ReadApartmentRepositories();
  const fileService = new CloudinaryService();

  return new DeleteApartmentByIdForAdminCommandHandler(
    uow,
    readApartmentRepo,
    fileService
  );
}

export function DeleteUserForAdminCH(): DeleteUserCommandHandler {
  const uow = new UnitOfWork();
  const fileService = new CloudinaryService();
  const readUserRepo = new ReadUserRepositories();

  return new DeleteUserCommandHandler(uow, readUserRepo, fileService);
}

export function GetAllAuditLogsQH(): GetAllAuditLogQueriesHandler {
  const readAuditLogRepo = new ReadAuditLogRepositories();
  return new GetAllAuditLogQueriesHandler(readAuditLogRepo);
}

export function SearchForAuditLogQH(): SearchForAuditLogByQueriesHandler {
  const readAuditLogRepo = new ReadAuditLogRepositories();
  return new SearchForAuditLogByQueriesHandler(readAuditLogRepo);
}
