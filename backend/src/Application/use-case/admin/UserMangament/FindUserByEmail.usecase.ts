import { IUnitOfWork } from "../../../../Core/repositories/UnitOfWorkRepositories.repositories";
import { ICashMemoryService } from "../../../interfaces/ICash.interface";
import { IFileStorageService } from "../../../interfaces/IFileStorage.interface";
import { IPasswordService } from "../../../interfaces/IPassword.interface";
import { IProfileStrategy } from "../../../strategy/profiles/IprofileStrategy.strategy";
import { LandlordProfileStrategy } from "../../../strategy/profiles/LandlordProfile.strategy";
import { StudentProfileStrategy } from "../../../strategy/profiles/StudentProfile.strategy";

export class FindUserByEmailUseCase {
  private profileStrategy: IProfileStrategy;
  constructor(
    private unitOfWork: IUnitOfWork,
    private passwordService: IPasswordService,
    private fileService: IFileStorageService,
    private cashService: ICashMemoryService
  ) {}

  public async execute(email: string) {
    await this.unitOfWork.startTransaction();

    const user = await this.unitOfWork.userRepo.findByEmail(email);
    if (!user) throw new Error("no user found !!");

    switch (user.getRole()) {
      case "student":
        this.profileStrategy = new StudentProfileStrategy(
          this.unitOfWork.studentRepo,
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

      default:
        await this.unitOfWork.rollbackTransaction();
        throw new Error("Invalid role !!");
    }

    const profile = await this.profileStrategy.UserProfile(user.getUserId());
    await this.unitOfWork.commitTransaction();
    return profile;
  }
}
