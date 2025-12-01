import { IUnitOfWork } from "../../../Core/repositories/UnitOfWorkRepositories.repositories";
import { AdminProfileStrategy } from "../../strategy/profiles/AdminProfile.strategy";
import { IProfileStrategy } from "../../strategy/profiles/IprofileStrategy.strategy";
import { LandlordProfileStrategy } from "../../strategy/profiles/LandlordProfile.strategy";
import { StudentProfileStrategy } from "../../strategy/profiles/StudentProfile.strategy";

export class UserProfileDataUseCase {
  private profileStrategy: IProfileStrategy;

  constructor(private unitOfWork: IUnitOfWork) {}

  public async execute(userId: string) {
    // Start the transaction
    await this.unitOfWork.startTransaction();

    // Fetch the user first
    const user = await this.unitOfWork.userRepo.findById(userId);
    if (!user) {
      await this.unitOfWork.rollbackTransaction(); // Rollback in case of error
      throw new Error("No user found !!");
    }
    console.log("Fetched user:", user);

    switch (user.getRole()) {
      case "admin":
        this.profileStrategy = new AdminProfileStrategy(
          this.unitOfWork.userRepo
        );
        break;
      case "landloard":
        this.profileStrategy = new LandlordProfileStrategy(
          this.unitOfWork.landlordRepo
        );
        break;

      case "student":
        this.profileStrategy = new StudentProfileStrategy(
          this.unitOfWork.studentRepo
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
