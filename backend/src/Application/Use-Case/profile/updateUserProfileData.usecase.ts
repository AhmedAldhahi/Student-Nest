import { IUnitOfWork } from "../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { userUpdateProfileRequest } from "../../Dtos/profile/adminRequest.updateProfile.profile.dtos";
import { ICashMemoryService } from "../../Interfaces/ICash.interface";
import { IFileStorageService } from "../../Interfaces/IFileStorage.interface";
import { IPasswordService } from "../../Interfaces/IPassword.interface";
import { AdminProfileStrategy } from "../../Strategy/profiles/AdminProfile.strategy";
import { IProfileStrategy } from "../../Strategy/profiles/IprofileStrategy.strategy";
import { LandlordProfileStrategy } from "../../Strategy/profiles/LandlordProfile.strategy";
import { StudentProfileStrategy } from "../../Strategy/profiles/StudentProfile.strategy";

export class updateUserProfileDataUseCase {
  private profileStrategy: IProfileStrategy;

  constructor(
    private unitOfWork: IUnitOfWork,
    private passwordService: IPasswordService,
    private readonly fileService: IFileStorageService,
    private readonly cashService: ICashMemoryService
  ) {}

  public async execute(userId: string, dto: userUpdateProfileRequest) {
    try {
      await this.unitOfWork.startTransaction();

      const user = await this.unitOfWork.userRepo.findById(userId);
      if (!user) throw new Error("no user found !!");

      switch (user.getRole()) {
        case "admin":
          this.profileStrategy = new AdminProfileStrategy(
            this.unitOfWork.userRepo,
            this.passwordService,
            this.fileService,
            this.cashService
          );

          break;

        case "landloard":
          this.profileStrategy = new LandlordProfileStrategy(
            this.unitOfWork.landlordRepo,
            this.passwordService,
            this.fileService,
            this.cashService
          );
          break;

        case "student":
          this.profileStrategy = new StudentProfileStrategy(
            this.unitOfWork.studentRepo,
            this.passwordService,
            this.fileService,
            this.cashService
          );
          break;

        default:
          await this.unitOfWork.rollbackTransaction();
          throw new Error("invalid role !!");
      }

      const profile = await this.profileStrategy.UpdateUserProfile(userId, dto);
      await this.unitOfWork.commitTransaction();

      return profile;
    } catch (error: any) {
      await this.unitOfWork.rollbackTransaction();
      throw error;
    }
  }
}
