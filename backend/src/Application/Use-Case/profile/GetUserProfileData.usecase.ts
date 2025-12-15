import { IUnitOfWork } from "../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { ICashMemoryService } from "../../Interfaces/ICash.interface";
import { IFileStorageService } from "../../Interfaces/IFileStorage.interface";
import { IPasswordService } from "../../Interfaces/IPassword.interface";
import { AdminProfileStrategy } from "../../Strategy/profiles/AdminProfile.strategy";
import { IProfileStrategy } from "../../Strategy/profiles/IprofileStrategy.strategy";
import { LandlordProfileStrategy } from "../../Strategy/profiles/LandlordProfile.strategy";
import { StudentProfileStrategy } from "../../Strategy/profiles/StudentProfile.strategy";

export class UserProfileDataUseCase {
  private profileStrategy: IProfileStrategy;

  constructor(
    private unitOfWork: IUnitOfWork,
    private passwordService: IPasswordService,
    private fileService: IFileStorageService,
    private cashService: ICashMemoryService
  ) {}

  public async execute(userId: string) {
    // Start the transaction
    await this.unitOfWork.startTransaction();

    const user = await this.unitOfWork.userRepo.findById(userId);
    if (!user) {
      await this.unitOfWork.rollbackTransaction(); // Rollback in case of error
      throw new Error("No user found !!");
    }

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
        await this.unitOfWork.rollbackTransaction(); // Rollback if role is invalid
        throw new Error("Invalid role !!");
    }

    const profile = await this.profileStrategy.UserProfile(userId);

    await this.unitOfWork.commitTransaction();

    return profile;
  }
}
