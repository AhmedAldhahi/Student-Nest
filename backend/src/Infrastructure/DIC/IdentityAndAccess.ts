import { CreateLandlordCommandHandler } from "../../Application/BoundedContexts/IdentityAndAccess/CommandHandler/CreateLandlordCommandHandler";
import { CreateStudentCommandHandler } from "../../Application/BoundedContexts/IdentityAndAccess/CommandHandler/CreateStudentCommandHandler";
import { ResendOtpCommandHandler } from "../../Application/BoundedContexts/IdentityAndAccess/CommandHandler/ResendOtpCommandHandler";
import { ResendOtpForgetPassCommandHandler } from "../../Application/BoundedContexts/IdentityAndAccess/CommandHandler/ResendOtpForgetPassCommandHandler";
import { UpdateAdminCommandHandler } from "../../Application/BoundedContexts/IdentityAndAccess/CommandHandler/UpdateAdminCommandHandler";
import { UpdateForgetPasswordCommandHandler } from "../../Application/BoundedContexts/IdentityAndAccess/CommandHandler/UpdateForgetPasswordCommandHandler";
import { UpdateLandlordCommandHandler } from "../../Application/BoundedContexts/IdentityAndAccess/CommandHandler/UpdateLandlordCommandHandler";
import { UpdateStudentCommandHandler } from "../../Application/BoundedContexts/IdentityAndAccess/CommandHandler/UpdateStudentCommandHandler";
import { VerifiedOtpCommandHandler } from "../../Application/BoundedContexts/IdentityAndAccess/CommandHandler/VerfiedOtpCommandHandler";
import { VerifiedOTPForgetPassCommandHandler } from "../../Application/BoundedContexts/IdentityAndAccess/CommandHandler/VerfiedOtpResetPassCommandHandler";
import { SendVerificationEmailHandler } from "../../Application/BoundedContexts/IdentityAndAccess/EventHandler/SendVerificationEmailHandler";
import { GetAllLandlordByQueriesQueriesHandler } from "../../Application/BoundedContexts/IdentityAndAccess/QueriesHandler/GetAllLandlordByQueriesQueriesHandler";
import { GetAllLandlordQueriesHandler } from "../../Application/BoundedContexts/IdentityAndAccess/QueriesHandler/GetAllLandlordQueriesHandler";
import { GetAllStudentsByQueriesQueriesHandler } from "../../Application/BoundedContexts/IdentityAndAccess/QueriesHandler/GetAllStudentByQueriesQueriesHandler ";
import { GetAllStudentQueriesHandler } from "../../Application/BoundedContexts/IdentityAndAccess/QueriesHandler/GetAllStudentQueriesHandler";
import { GetLandlordProfileQueriesHandlers } from "../../Application/BoundedContexts/IdentityAndAccess/QueriesHandler/GetLandlordProfileQueriesHandler";
import { GetStudentQueriesHandlers } from "../../Application/BoundedContexts/IdentityAndAccess/QueriesHandler/GetStudentProfileQueriesHandler";
import { GetUserProfileQueriesHandlers } from "../../Application/BoundedContexts/IdentityAndAccess/QueriesHandler/GetUserProfileQueriesHandlerts";
import { UserLoginQueriesHandler } from "../../Application/BoundedContexts/IdentityAndAccess/QueriesHandler/UserLoginQueriesHandler";
import { GetUserQueriesSimpleFactory } from "../../Application/BoundedContexts/Shared/SimpleFactory/GetUserQuerySimpleFactory";
import { UserSimpleFactory } from "../../Application/BoundedContexts/Shared/SimpleFactory/GetUsersSimpleFactory";
import { AdminProfileStrategy } from "../../Application/BoundedContexts/Shared/Strategy/profile/AdminProfile.strategy";
import { LandlordProfileStrategy } from "../../Application/BoundedContexts/Shared/Strategy/profile/LandlordProfile.strategy";
import { ProfileContext } from "../../Application/BoundedContexts/Shared/Strategy/profile/profilecontext";
import { StudentProfileStrategy } from "../../Application/BoundedContexts/Shared/Strategy/profile/StudentProfile.strategy";
import { UserRegisteredEvent } from "../../Domain/BoundedContexts/IdentityAndAccess/Events/UserRegisterdEvent.event";
import { DomainEventDispatcher } from "../../Domain/Shared/Event/DomainEventDispatcher";
import { InMemoryEventBus } from "../EventBus/InMemmoryEventBus";
import { ReadLandlordRepositories } from "../Repositories/Read/ReadLandlordRepositories";
import { ReadStudentRepositories } from "../Repositories/Read/ReadStudentRepositories";
import { ReadUserRepositories } from "../Repositories/Read/ReadUserRepositories";
import { UnitOfWork } from "../Repositories/unitOfWork.repositories";
import { RedisCashService } from "../Services/Cashing/RadisCashe";
import { MailtrapService } from "../Services/email/MailtrapService.service";
import { CloudinaryService } from "../Services/media/CloudinaryService.service";
import { BcryptPasswordHasher } from "../Services/security/BcryptPasswordHasher.service";
import { JwtTokenService } from "../Services/security/TokenService.service";

export function RegisterLandlordCH(): CreateLandlordCommandHandler {
  const readUserRepo = new ReadUserRepositories();
  const uow = new UnitOfWork();
  const fileService = new CloudinaryService();
  const emailService = new MailtrapService();
  const passwordService = new BcryptPasswordHasher();

  const verificationEmailHandler = new SendVerificationEmailHandler(
    emailService
  );

  const eventDispatch = new DomainEventDispatcher();
  eventDispatch.register(
    UserRegisteredEvent.EVENT_KEY,
    verificationEmailHandler
  );

  const eventBus = new InMemoryEventBus(eventDispatch);

  return new CreateLandlordCommandHandler(
    uow,
    passwordService,
    fileService,
    readUserRepo,
    eventBus
  );
}

export function RegisterStudentCH(): CreateStudentCommandHandler {
  const readUserRepo = new ReadUserRepositories();
  const uow = new UnitOfWork();
  const fileService = new CloudinaryService();
  const emailService = new MailtrapService();
  const passwordService = new BcryptPasswordHasher();

  const verificationEmailHandler = new SendVerificationEmailHandler(
    emailService
  );

  const eventDispatch = new DomainEventDispatcher();
  eventDispatch.register(
    UserRegisteredEvent.EVENT_KEY,
    verificationEmailHandler
  );

  const eventBus = new InMemoryEventBus(eventDispatch);

  return new CreateStudentCommandHandler(
    uow,
    passwordService,
    fileService,
    readUserRepo,
    eventBus
  );
}

export function LoginUserQH(): UserLoginQueriesHandler {
  const token = new JwtTokenService();
  const passwordService = new BcryptPasswordHasher();
  const readUserRepo = new ReadUserRepositories();

  return new UserLoginQueriesHandler(passwordService, readUserRepo, token);
}

export function ResendOtpCH(): ResendOtpCommandHandler {
  const emailService = new MailtrapService();
  const readUserRepo = new ReadUserRepositories();
  const uow = new UnitOfWork();

  const verificationEmailHandler = new SendVerificationEmailHandler(
    emailService
  );

  const eventDispatch = new DomainEventDispatcher();
  eventDispatch.register(
    UserRegisteredEvent.EVENT_KEY,
    verificationEmailHandler
  );

  const eventBus = new InMemoryEventBus(eventDispatch);

  return new ResendOtpCommandHandler(readUserRepo, uow, eventBus);
}

export function VerifiedOtpCH(): VerifiedOtpCommandHandler {
  const readUserRepo = new ReadUserRepositories();
  const uow = new UnitOfWork();
  const token = new JwtTokenService();

  return new VerifiedOtpCommandHandler(uow, readUserRepo, token);
}

export function ResendOtpForgetPasswordCH(): ResendOtpForgetPassCommandHandler {
  const emailService = new MailtrapService();
  const readUserRepo = new ReadUserRepositories();
  const uow = new UnitOfWork();

  const emailEventHandler = new SendVerificationEmailHandler(emailService);

  const eventDispatch = new DomainEventDispatcher();

  eventDispatch.register(UserRegisteredEvent.EVENT_KEY, emailEventHandler);
  const eventBus = new InMemoryEventBus(eventDispatch);

  return new ResendOtpForgetPassCommandHandler(uow, readUserRepo, eventBus);
}

export function VerifiedOtpForgetPasswordCH(): VerifiedOTPForgetPassCommandHandler {
  const uow = new UnitOfWork();
  const readUserRepo = new ReadUserRepositories();

  return new VerifiedOTPForgetPassCommandHandler(uow, readUserRepo);
}

export function UpdateForgetPasswordCH(): UpdateForgetPasswordCommandHandler {
  const uow = new UnitOfWork();
  const readUserRepo = new ReadUserRepositories();
  const TokenService = new JwtTokenService();
  const passwordService = new BcryptPasswordHasher();

  return new UpdateForgetPasswordCommandHandler(
    passwordService,
    uow,
    TokenService,
    readUserRepo
  );
}

export function getUserProfileData(): ProfileContext {
  // shared
  const passwordService = new BcryptPasswordHasher();
  const fileService = new CloudinaryService();
  const cashService = new RedisCashService();
  const uow = new UnitOfWork();

  // Queries Repo
  const ReadUserRepo = new ReadUserRepositories();
  const ReadLandlordRepo = new ReadLandlordRepositories();
  const ReadStudentRepo = new ReadStudentRepositories();

  // queries handler
  const UserQueries = new GetUserProfileQueriesHandlers(ReadUserRepo);
  const landlordQueries = new GetLandlordProfileQueriesHandlers(
    ReadLandlordRepo,
    ReadUserRepo
  );
  const studentQueries = new GetStudentQueriesHandlers(
    ReadStudentRepo,
    ReadUserRepo
  );

  // command handler

  const UserCommand = new UpdateAdminCommandHandler(
    uow,
    ReadUserRepo,
    fileService,
    passwordService
  );
  const LandlordCommand = new UpdateLandlordCommandHandler(
    uow,
    ReadLandlordRepo,
    ReadUserRepo,
    fileService,
    passwordService
  );

  const StudentCommand = new UpdateStudentCommandHandler(
    uow,
    ReadUserRepo,
    ReadStudentRepo,
    fileService,
    passwordService
  );

  // strategy
  const userStrategy = new AdminProfileStrategy(
    UserQueries,
    UserCommand,
    cashService
  );
  const landlordStrategy = new LandlordProfileStrategy(
    landlordQueries,
    LandlordCommand,
    cashService
  );
  const studentStrategy = new StudentProfileStrategy(
    studentQueries,
    StudentCommand,
    cashService
  );

  // profile context
  return new ProfileContext(
    ReadUserRepo,
    userStrategy,
    landlordStrategy,
    studentStrategy
  );
}

export function updateUserProfile(): ProfileContext {
  const passwordService = new BcryptPasswordHasher();
  const fileService = new CloudinaryService();
  const cashService = new RedisCashService();
  const uow = new UnitOfWork();

  // Queries Repo
  const ReadUserRepo = new ReadUserRepositories();
  const ReadLandlordRepo = new ReadLandlordRepositories();
  const ReadStudentRepo = new ReadStudentRepositories();

  // queries handler
  const UserQueries = new GetUserProfileQueriesHandlers(ReadUserRepo);
  const landlordQueries = new GetLandlordProfileQueriesHandlers(
    ReadLandlordRepo,
    ReadUserRepo
  );
  const studentQueries = new GetStudentQueriesHandlers(
    ReadStudentRepo,
    ReadUserRepo
  );

  // command handler

  const UserCommand = new UpdateAdminCommandHandler(
    uow,
    ReadUserRepo,
    fileService,
    passwordService
  );
  const LandlordCommand = new UpdateLandlordCommandHandler(
    uow,
    ReadLandlordRepo,
    ReadUserRepo,
    fileService,
    passwordService
  );
  const StudentCommand = new UpdateStudentCommandHandler(
    uow,
    ReadUserRepo,
    ReadStudentRepo,
    fileService,
    passwordService
  );

  // strategy
  const userStrategy = new AdminProfileStrategy(
    UserQueries,
    UserCommand,
    cashService
  );
  const landlordStrategy = new LandlordProfileStrategy(
    landlordQueries,
    LandlordCommand,
    cashService
  );
  const studentStrategy = new StudentProfileStrategy(
    studentQueries,
    StudentCommand,
    cashService
  );

  return new ProfileContext(
    ReadUserRepo,
    userStrategy,
    landlordStrategy,
    studentStrategy
  );
}

export function findUserByQuery(): GetUserQueriesSimpleFactory {
  // Read repo
  const ReadLandlordsRepo = new ReadLandlordRepositories();
  const ReadStudentsRepo = new ReadStudentRepositories();
  const readUserRepo = new ReadUserRepositories();

  const GetLandlordsQueryQueriesHandler =
    new GetAllLandlordByQueriesQueriesHandler(ReadLandlordsRepo);

  const GetStudentQueryQueriesHandler =
    new GetAllStudentsByQueriesQueriesHandler(ReadStudentsRepo);

  return new GetUserQueriesSimpleFactory(
    readUserRepo,
    GetLandlordsQueryQueriesHandler,
    GetStudentQueryQueriesHandler
  );
}

export function GetAllUsers(): UserSimpleFactory {
  // read repo
  const ReadLandlordsRepo = new ReadLandlordRepositories();
  const ReadStudentsRepo = new ReadStudentRepositories();
  const readUserRepo = new ReadUserRepositories();

  // Queries
  const getLandlordsQueries = new GetAllLandlordQueriesHandler(
    ReadLandlordsRepo
  );
  const getStudentQueries = new GetAllStudentQueriesHandler(ReadStudentsRepo);

  return new UserSimpleFactory(
    readUserRepo,
    getLandlordsQueries,
    getStudentQueries
  );
}
