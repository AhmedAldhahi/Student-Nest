import { DeleteUserCommandHandler } from "../../../Application/Command/Handlers/DeleteUserCommandHandler";
import { updateVerificationStatusCommandHandler } from "../../../Application/Command/Handlers/updateLandlordVerficationStatusCommandHandler";
import { GetAllLandlordByEmailQueriesHandler } from "../../../Application/Querie/Handlers/GetAllLandlordByEmailQueriesHandler";
import { GetAllLandlordQueriesHandler } from "../../../Application/Querie/Handlers/GetAllLandlordQueriesHandler";
import { GetAllStudentsByEmailQueriesHandler } from "../../../Application/Querie/Handlers/GetAllStudentByEmailQueriesHandler ";
import { GetAllStudentQueriesHandler } from "../../../Application/Querie/Handlers/GetAllStudentQueriesHandler";
import { GetUserEmailSimpleFactory } from "../../../Application/SimpleFactory/GetUserEmailSimpleFactory";
import { UserSimpleFactory } from "../../../Application/SimpleFactory/GetUsersSimpleFactory";
import { DeleteLandlordByIdUseCase } from "../../../Application/Use-Case/admin/UserMangament/DeleteUserById.usecase";
import { EditLandlordVerificationStatusUseCase } from "../../../Application/Use-Case/admin/UserMangament/EditLandlordVerificationStatus.usecase";
import { FindUserByEmailUseCase } from "../../../Application/Use-Case/admin/UserMangament/FindUserByEmail.usecase";
import { GetAllUserUseCase } from "../../../Application/Use-Case/admin/UserMangament/GetAllUser.usecase";
import { RedisCashService } from "../../Cashing/RadisCashe";
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

export function findUserByEmail(): FindUserByEmailUseCase {
  // Read repo
  const ReadLandlordsRepo = new ReadLandlordRepositories();
  const ReadStudentsRepo = new ReadStudentRepositories();
  const ReadUserRepo = new ReadUserRepositories();

  const GetLandlordsEmailQueriesHandler =
    new GetAllLandlordByEmailQueriesHandler(ReadLandlordsRepo);

  const GetStudentEmailQueriesHandler = new GetAllStudentsByEmailQueriesHandler(
    ReadStudentsRepo
  );

  const getEmailsUsersSimpleFactors = new GetUserEmailSimpleFactory(
    GetLandlordsEmailQueriesHandler,
    GetStudentEmailQueriesHandler
  );

  return new FindUserByEmailUseCase(getEmailsUsersSimpleFactors, ReadUserRepo);
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
