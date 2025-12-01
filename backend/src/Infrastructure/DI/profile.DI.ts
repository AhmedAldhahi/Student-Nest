import { UserProfileDataUseCase } from "../../Application/use-case/profile/GetUserProfileData.usecase";
import { UnitOfWork } from "../repositories/unitOfWork.repositories";

export function getUserProfileData(): UserProfileDataUseCase {
  const userRepo = new UnitOfWork();
  return new UserProfileDataUseCase(userRepo);
}
