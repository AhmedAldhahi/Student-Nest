import { DeleteLandlordByIdUseCase } from "../../../Application/use-case/admin/LandlordMangamement/DeleteLandlordById.usecase";
import { EditLandlordVerificationStatusUseCase } from "../../../Application/use-case/admin/LandlordMangamement/EditLandlordVerificationStatus.usecase";
import { FindUserByEmailUseCase } from "../../../Application/use-case/admin/LandlordMangamement/FindUserByEmail.usecase";
import { GetAllLandlordUseCase } from "../../../Application/use-case/admin/LandlordMangamement/GetAllLandlords.usecase";
import { RedisCashService } from "../../cashing/RadisCashe";
import { UnitOfWork } from "../../repositories/unitOfWork.repositories";
import { CloudinaryService } from "../../services/media/CloudinaryService.service";
import { BcryptPasswordHasher } from "../../services/security/BcryptPasswordHasher.service";

export function GetAllLandlords(): GetAllLandlordUseCase {
  const uow = new UnitOfWork();
  return new GetAllLandlordUseCase(uow);
}

export function updateLandlordStatus(): EditLandlordVerificationStatusUseCase {
  const uow = new UnitOfWork();
  return new EditLandlordVerificationStatusUseCase(uow);
}

export function deleteLandlordById(): DeleteLandlordByIdUseCase {
  const uow = new UnitOfWork();
  return new DeleteLandlordByIdUseCase(uow);
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
