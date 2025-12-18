import { IReadUserRepositories } from "../../../Domain/Repositories/Read/ReadUserRepositories.repositories";
import { IUnitOfWork } from "../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { userUpdateProfileRequest } from "../../Dtos/profile/adminRequest.updateProfile.profile.dtos";
import { ICashMemoryService } from "../../Interfaces/ICash.interface";
import { IFileStorageService } from "../../Interfaces/IFileStorage.interface";
import { IPasswordService } from "../../Interfaces/IPassword.interface";
import { AdminProfileStrategy } from "../../Strategy/profiles/AdminProfile.strategy";
import { IProfileStrategy } from "../../Strategy/profiles/IprofileStrategy.strategy";
import { LandlordProfileStrategy } from "../../Strategy/profiles/LandlordProfile.strategy";
import { ProfileContext } from "../../Strategy/profiles/profilecontext";
import { StudentProfileStrategy } from "../../Strategy/profiles/StudentProfile.strategy";

export class updateUserProfileDataUseCase {
  private profileStrategy: IProfileStrategy;

  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private context: ProfileContext
  ) {}

  public async execute(userId: string, dto: userUpdateProfileRequest) {
    try {

      const user = await this.readUserRepo.findById(userId);
      if (!user) throw new Error("no user found !!");

      return  await this.context.executeUpdateStrategy(user.getRole(),user.getUserId(),dto);

     
    } catch (error: any) {
      throw error;
    }
  }
}
