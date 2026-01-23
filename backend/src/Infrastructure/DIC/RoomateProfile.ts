import { RemoveCashHandler } from "../../Application/BoundedContexts/Adminstration/EventHandler/RemoveCashHandler";
import { CreateRoommateProfileCommandHandler } from "../../Application/BoundedContexts/RoommateProfile/CommandHandler/CreateRoommateProfileCommandHandler";
import { UpdateWhatsappVisibleCommandHandler } from "../../Application/BoundedContexts/RoommateProfile/CommandHandler/UodateWhatsappVisableStatusCommandHandler";
import { UpdateRoommateProfileCommandHandler } from "../../Application/BoundedContexts/RoommateProfile/CommandHandler/UpdateRoommateProfileCommandHandler";
import { RemoveCashHandlerForRoommateEvent } from "../../Application/BoundedContexts/RoommateProfile/eventHandler/RemoveCashHandler";
import { GetRoommateProfileThatMatched } from "../../Application/BoundedContexts/RoommateProfile/QueriesHandler/GetRoommatedProfileThatMatchedQueriesHandler";
import { GetRoommateProfileQueriesHandler } from "../../Application/BoundedContexts/RoommateProfile/QueriesHandler/GetRoommateProfileQueriesHandler";
import { UpdateUserEvent } from "../../Domain/BoundedContexts/IdentityAndAccess/Events/UpdateUserEvent.event";
import { RoommateProfileEvent } from "../../Domain/BoundedContexts/RommateProfile/Events/UpdateRoommateEvent.event";
import { DomainEventDispatcher } from "../../Domain/Shared/Event/DomainEventDispatcher";
import { InMemoryEventBus } from "../EventBus/InMemmoryEventBus";
import { ReadLifeCycleRepositories } from "../Repositories/Read/ReadLifeCycleReposotries.Repostries";
import { ReadRoommateProfileRepositories } from "../Repositories/Read/ReadRoommateProfileRepositories";
import { ReadStudentRepositories } from "../Repositories/Read/ReadStudentRepositories";
import { ReadUserRepositories } from "../Repositories/Read/ReadUserRepositories";
import { UnitOfWork } from "../Repositories/unitOfWork.repositories";
import { RedisCashService } from "../Services/Cashing/RadisCashe";

export function createRoommateProfileCH(): CreateRoommateProfileCommandHandler {
  const readUserRepo = new ReadUserRepositories();
  const readStudentRepo = new ReadStudentRepositories();
  const uow = new UnitOfWork();
  const readRoommateProfileRepo = new ReadRoommateProfileRepositories();
  const eventDispatch = new DomainEventDispatcher();
  const cashService = new RedisCashService();
  const cashServiceHandler = new RemoveCashHandler(cashService);
  eventDispatch.register(UpdateUserEvent.EVENT_KEY, cashServiceHandler);

  const eventBus = new InMemoryEventBus(eventDispatch);

  return new CreateRoommateProfileCommandHandler(
    readUserRepo,
    readStudentRepo,
    readRoommateProfileRepo,
    uow,
    eventBus,
  );
}

export function UpdateRoommateProfileCH(): UpdateRoommateProfileCommandHandler {
  const readUserRepo = new ReadUserRepositories();
  const readStudentRepo = new ReadStudentRepositories();
  const uow = new UnitOfWork();
  const readRoommateProfileRepo = new ReadRoommateProfileRepositories();
  const lifeCycleHabitRepo = new ReadLifeCycleRepositories();
  const eventDispatch = new DomainEventDispatcher();
  const cashService = new RedisCashService();
  const cashServiceHandler = new RemoveCashHandlerForRoommateEvent(cashService);

  eventDispatch.register(RoommateProfileEvent.EVENT_KEY, cashServiceHandler);
  const eventBus = new InMemoryEventBus(eventDispatch);

  return new UpdateRoommateProfileCommandHandler(
    readUserRepo,
    readStudentRepo,
    readRoommateProfileRepo,
    lifeCycleHabitRepo,
    uow,
    eventBus,
  );
}

export function GetRoommateProfileQH(): GetRoommateProfileQueriesHandler {
  const readUserRepo = new ReadUserRepositories();
  const readStudentRepo = new ReadStudentRepositories();
  const readRoommateProfileRepo = new ReadRoommateProfileRepositories();

  return new GetRoommateProfileQueriesHandler(
    readUserRepo,
    readStudentRepo,
    readRoommateProfileRepo,
  );
}
export function GetRoommateProfileThatMatchQH(): GetRoommateProfileThatMatched {
  const readUserRepo = new ReadUserRepositories();
  const readStudentRepo = new ReadStudentRepositories();
  const readRoommateProfileRepo = new ReadRoommateProfileRepositories();

  return new GetRoommateProfileThatMatched(
    readUserRepo,
    readStudentRepo,
    readRoommateProfileRepo,
  );
}

export function UpdateWhatsappPhoneNumberVisibleCH(): UpdateWhatsappVisibleCommandHandler {
  const readUserRepo = new ReadUserRepositories();
  const readStudentRepo = new ReadStudentRepositories();
  const uow = new UnitOfWork();

  return new UpdateWhatsappVisibleCommandHandler(
    readUserRepo,
    readStudentRepo,
    uow,
  );
}
