import { DeleteLandlordByIdUseCase } from "../../../Application/Use-Case/admin/UserMangament/DeleteUserById.usecase";
import { EditLandlordVerificationStatusUseCase } from "../../../Application/Use-Case/admin/UserMangament/EditLandlordVerificationStatus.usecase";
import { FindUserByEmailUseCase } from "../../../Application/Use-Case/admin/UserMangament/FindUserByEmail.usecase";
import { GetAllLandlordUseCase } from "../../../Application/Use-Case/admin/UserMangament/GetAllLandlords.usecase";
import { GetAllStudentUseCase } from "../../../Application/Use-Case/admin/UserMangament/GetAllStudents.usecase";
import { RedisCashService } from "../../Cashing/RadisCashe";
import { UnitOfWork } from "../../Repositories/unitOfWork.repositories";
import { CloudinaryService } from "../../Services/media/CloudinaryService.service";
import { BcryptPasswordHasher } from "../../Services/security/BcryptPasswordHasher.service";

export function GetAllLandlords(): GetAllLandlordUseCase {
  const uow = new UnitOfWork();
  return new GetAllLandlordUseCase(uow);
}

export function updateLandlordStatus(): EditLandlordVerificationStatusUseCase {
  const uow = new UnitOfWork();
  const redis = new RedisCashService();
  return new EditLandlordVerificationStatusUseCase(uow, redis);
}

export function deleteLandlordById(): DeleteLandlordByIdUseCase {
  const uow = new UnitOfWork();
  const cloudService = new CloudinaryService();
  return new DeleteLandlordByIdUseCase(uow, cloudService);
}

export function findUserByEmail(): FindUserByEmailUseCase {
  const uow = new UnitOfWork();
  const passwordService = new BcryptPasswordHasher();
  const cloudUnary = new CloudinaryService();
  const redisService = new RedisCashService();

  return new FindUserByEmailUseCase(
    uow,
    passwordService,
    cloudUnary,
    redisService
  );
}

export function GetAllStudents(): GetAllStudentUseCase {
  const uow = new UnitOfWork();
  return new GetAllStudentUseCase(uow);
}
