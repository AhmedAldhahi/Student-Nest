import { UserProfileDataUseCase } from "../../Application/Use-Case/profile/GetUserProfileData.usecase";
import { updateUserProfileDataUseCase } from "../../Application/Use-Case/profile/updateUserProfileData.usecase";
import { UnitOfWork } from "../Repositories/unitOfWork.repositories";
import { BcryptPasswordHasher } from "../Services/security/BcryptPasswordHasher.service";
import { CloudinaryService } from "../Services/media/CloudinaryService.service";
import { RedisCashService } from "../Cashing/RadisCashe";
import { ReadUserRepositories } from "../Repositories/Read/ReadUserRepositories";
import { ProfileContext } from "../../Application/Strategy/profiles/profilecontext";
import { ReadLandlordRepositories } from "../Repositories/Read/ReadLandlordRepositories";
import { ReadStudentRepositories } from "../Repositories/Read/ReadStudentRepositories";
import { AdminProfileStrategy } from "../../Application/Strategy/profiles/AdminProfile.strategy";
import { LandlordProfileStrategy } from "../../Application/Strategy/profiles/LandlordProfile.strategy";
import { StudentProfileStrategy } from "../../Application/Strategy/profiles/StudentProfile.strategy";
import { UpdateAdminCommandHandler } from "../../Application/Command/Handlers/Adminstration/UpdateAdminCommandHandler";
import { UpdateLandlordCommandHandler } from "../../Application/Command/Handlers/Housing/Landlord/UpdateLandlordCommandHandler";
import { UpdateStudentCommandHandler } from "../../Application/Command/Handlers/Student/UpdateStudentCommandHandler";
import { GetLandlordProfileQueriesHandlers } from "../../Application/Queries/Handlers/Housing/Landlord/GetLandlordProfileQueriesHandler";
import { GetStudentQueriesHandlers } from "../../Application/Queries/Handlers/Student/GetStudentProfileQueriesHandler";
import { GetUserProfileQueriesHandlers } from "../../Application/Queries/Handlers/Identiy/GetUserProfileQueriesHandlerts";

export function getUserProfileData(): UserProfileDataUseCase {
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
  const profileContext = new ProfileContext(
    userStrategy,
    landlordStrategy,
    studentStrategy
  );

  return new UserProfileDataUseCase(profileContext, ReadUserRepo);
  // userRepo,
  // passwordService,
  // fileService,
  // cashService
}

export function updateUserProfile(): updateUserProfileDataUseCase {
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
  const profileContext = new ProfileContext(
    userStrategy,
    landlordStrategy,
    studentStrategy
  );

  return new updateUserProfileDataUseCase(ReadUserRepo, profileContext);
}
