import { union } from "zod";
import { UserProfileDataUseCase } from "../../Application/use-case/profile/GetUserProfileData.usecase";
import { updateUserProfileDataUseCase } from "../../Application/use-case/profile/updateUserProfileData.usecase";
import { UnitOfWork } from "../repositories/unitOfWork.repositories";
import { BcryptPasswordHasher } from "../services/security/BcryptPasswordHasher.service";
import { CloudinaryService } from "../services/media/CloudinaryService.service";

export function getUserProfileData(): UserProfileDataUseCase {
  const userRepo = new UnitOfWork();
  return new UserProfileDataUseCase(userRepo);
}

export function updateUserProfile(): updateUserProfileDataUseCase {
  const userRepo = new UnitOfWork();
  const passService = new BcryptPasswordHasher();
  const fileService = new CloudinaryService();
  return new updateUserProfileDataUseCase(userRepo, passService,fileService);
}
