import { UserProfileDataUseCase } from "../../Application/Use-Case/profile/GetUserProfileData.usecase";
import { updateUserProfileDataUseCase } from "../../Application/Use-Case/profile/updateUserProfileData.usecase";
import { UnitOfWork } from "../Repositories/unitOfWork.repositories";
import { BcryptPasswordHasher } from "../Services/security/BcryptPasswordHasher.service";
import { CloudinaryService } from "../Services/media/CloudinaryService.service";
import { RedisCashService } from "../Cashing/RadisCashe";

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
