import { UserProfileDataUseCase } from "../../Application/use-case/profile/GetUserProfileData.usecase";
import { updateUserProfileDataUseCase } from "../../Application/use-case/profile/updateUserProfileData.usecase";
import { UnitOfWork } from "../repositories/unitOfWork.repositories";
import { BcryptPasswordHasher } from "../services/security/BcryptPasswordHasher.service";
import { CloudinaryService } from "../services/media/CloudinaryService.service";
import { RedisCashService } from "../cashing/RadisCashe";

export function getUserProfileData(): UserProfileDataUseCase {
  const userRepo = new UnitOfWork();
  const passwordService = new BcryptPasswordHasher();
  const fileService = new CloudinaryService();
  const cashService = new RedisCashService();

  return new UserProfileDataUseCase(
    userRepo,
    passwordService,
    fileService,
    cashService
  );
}

export function updateUserProfile(): updateUserProfileDataUseCase {
  const userRepo = new UnitOfWork();
  const passService = new BcryptPasswordHasher();
  const fileService = new CloudinaryService();
  const cashService = new RedisCashService();
  return new updateUserProfileDataUseCase(
    userRepo,
    passService,
    fileService,
    cashService
  );
}
