import { updateVerificationStatusCommandHandler } from "../../../Application/Command/Handlers/Adminstration/updateLandlordVerficationStatusCommandHandler";
import { DeleteUserCommandHandler } from "../../../Application/Command/Handlers/Adminstration/DeleteUserCommandHandler";
import { UpdateUserActivateStatusCommandHandler } from "../../../Application/Command/Handlers/Adminstration/UpdateUserActivateStatus.CommandHandler";
import { GetAllLandlordByQueriesQueriesHandler } from "../../../Application/Queries/Handlers/Housing/Landlord/GetAllLandlordByQueriesQueriesHandler";
import { GetAllLandlordQueriesHandler } from "../../../Application/Queries/Handlers/Housing/Landlord/GetAllLandlordQueriesHandler";
import { GetAllStudentsByQueriesQueriesHandler } from "../../../Application/Queries/Handlers/Student/GetAllStudentByQueriesQueriesHandler ";
import { GetAllStudentQueriesHandler } from "../../../Application/Queries/Handlers/Student/GetAllStudentQueriesHandler";
import { GetUserEmailSimpleFactory } from "../../../Application/SimpleFactory/GetUserQuerySimpleFactory";
import { UserSimpleFactory } from "../../../Application/SimpleFactory/GetUsersSimpleFactory";
import { DeleteLandlordByIdUseCase } from "../../../Application/Use-Case/admin/UserMangament/DeleteUserById.usecase";
import { EditLandlordVerificationStatusUseCase } from "../../../Application/Use-Case/admin/UserMangament/EditLandlordVerificationStatus.usecase";
import { EditUserActivateStatsUseCase } from "../../../Application/Use-Case/admin/UserMangament/EditUserActivateStatus.usecase";
import { FindUserByQueryUseCase } from "../../../Application/Use-Case/admin/UserMangament/FindUserByQuery.usecase";
import { GetAllUserUseCase } from "../../../Application/Use-Case/admin/UserMangament/GetAllUser.usecase";
import { RedisCashService } from "../../Services/Cashing/RadisCashe";
import { ReadLandlordRepositories } from "../../Repositories/Read/ReadLandlordRepositories";
import { ReadStudentRepositories } from "../../Repositories/Read/ReadStudentRepositories";
import { ReadUserRepositories } from "../../Repositories/Read/ReadUserRepositories";
import { UnitOfWork } from "../../Repositories/unitOfWork.repositories";
import { CloudinaryService } from "../../Services/media/CloudinaryService.service";

export function updateLandlordStatus(): EditLandlordVerificationStatusUseCase {
  const uow = new UnitOfWork();
  const redis = new RedisCashService();
  const readLandlordRepo = new ReadLandlordRepositories();

  const commandHandler = new updateVerificationStatusCommandHandler(
    readLandlordRepo,
    uow
  );

  return new EditLandlordVerificationStatusUseCase(commandHandler, redis);
}

export function deleteLandlordById(): DeleteLandlordByIdUseCase {
  const uow = new UnitOfWork();
  const cloudService = new CloudinaryService();
  const readUserRepo = new ReadUserRepositories();

  const commandHandler = new DeleteUserCommandHandler(
    uow,
    readUserRepo,
    cloudService
  );

  return new DeleteLandlordByIdUseCase(commandHandler);
}

export function findUserByQuery(): FindUserByQueryUseCase {
  // Read repo
  const ReadLandlordsRepo = new ReadLandlordRepositories();
  const ReadStudentsRepo = new ReadStudentRepositories();

  const GetLandlordsQueryQueriesHandler =
    new GetAllLandlordByQueriesQueriesHandler(ReadLandlordsRepo);

  const GetStudentQueryQueriesHandler =
    new GetAllStudentsByQueriesQueriesHandler(ReadStudentsRepo);

  const getEmailsUsersSimpleFactors = new GetUserEmailSimpleFactory(
    GetLandlordsQueryQueriesHandler,
    GetStudentQueryQueriesHandler
  );

  return new FindUserByQueryUseCase(getEmailsUsersSimpleFactors);
}

export function GetAllUsers(): GetAllUserUseCase {
  // read repo
  const ReadLandlordsRepo = new ReadLandlordRepositories();
  const ReadStudentsRepo = new ReadStudentRepositories();

  // Queries
  const getLandlordsQueries = new GetAllLandlordQueriesHandler(
    ReadLandlordsRepo
  );
  const getStudentQueries = new GetAllStudentQueriesHandler(ReadStudentsRepo);

  const userSimpleFactory = new UserSimpleFactory(
    getLandlordsQueries,
    getStudentQueries
  );

  return new GetAllUserUseCase(userSimpleFactory);
}

export function UpdateUserActivateStatusUseCase(): EditUserActivateStatsUseCase {
  const userRepo = new ReadUserRepositories();
  const uow = new UnitOfWork();
  const commandHandler = new UpdateUserActivateStatusCommandHandler(
    uow,
    userRepo
  );
  return new EditUserActivateStatsUseCase(commandHandler);
}
