import { IReadStudentRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadStudentRepositories.repositories";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IReadLifeCycleHabit } from "../../../../Domain/BoundedContexts/RommateProfile/Repositories/ReadLifeCycleHabbit.reposotires";
import { IReadRoommateProfileRepo } from "../../../../Domain/BoundedContexts/RommateProfile/Repositories/ReadRommateProfile.reposotries";
import { Age } from "../../../../Domain/BoundedContexts/RommateProfile/Value-Object/AgeValueObject.vo";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { UpdateRoommateProfileCommand } from "../Command/UpdateRoommateProfileCommand";

export class UpdateRoommateProfileCommandHandler implements ICommandHandlers<UpdateRoommateProfileCommand> {
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readStudentRepo: IReadStudentRepositories,
    private readonly readRoommateProfileRepo: IReadRoommateProfileRepo,
    private readonly readLifeCycleHabitRepo: IReadLifeCycleHabit,
    private readonly uow: IUnitOfWork,
  ) {}

  public async handle(command: UpdateRoommateProfileCommand): Promise<any> {
    try {
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("no user been found !!");
      user.ensureAccountIsActive();

      const student = await this.readStudentRepo.findStudentById(
        command.userId,
      );
      if (!student) throw new Error("no student been found !!");

      if (student.getRoommateProfileStatus() === false) {
        throw new Error("you can not update profile you not created it !!");
      }

      const roommateProfile =
        await this.readRoommateProfileRepo.FindStudentRoommateProfileById(
          command.userId,
        );

      if (!roommateProfile)
        throw new Error(
          `no roommate profile found for this user ${command.userId}`,
        );

      const LifeCycleHabit =
        await this.readLifeCycleHabitRepo.FindRoommateProfileForStudent(
          command.userId,
          roommateProfile.getRoommateId(),
        );

      if (!LifeCycleHabit) {
        throw new Error("Critical: LifeCycleHabit missing for this profile");
      }

      // 3. Apply Updates to Profile (Aggregate Root)
      if (command.Language) {
        roommateProfile.changeLanguage(command.Language);
      }

      if (command.bio) {
        roommateProfile.changeBio(command.bio);
      }

      if (command.UserAcceptNoiseTolerance) {
        roommateProfile.changeNoiseTolerance(command.UserAcceptNoiseTolerance);
      }

      if (command.UserSleepSchedule) {
        roommateProfile.changeSleepSchedule(command.UserSleepSchedule);
      }

      if (command.minAge) {
        roommateProfile.changeMinAge(Age.create(command.minAge));
      }

      if (command.maxAge) {
        roommateProfile.changeMaxAge(Age.create(command.maxAge));
      }

      // 4. Apply Updates to Habit (Child Entity)
      if (command.guestPolicyType) {
        LifeCycleHabit.changeGuestPolicyType(command.guestPolicyType);
      }

      if (command.petType) {
        LifeCycleHabit.changePetType(command.petType);
      }

      if (command.petPreferenceType) {
        LifeCycleHabit.changePetPreferenceType(command.petPreferenceType);
      }

      if (command.FoodPreferenceType) {
        LifeCycleHabit.changeFoodPreferenceType(command.FoodPreferenceType);
      }

      if (command.SharingLevelType) {
        LifeCycleHabit.changeSharingLevelType(command.SharingLevelType);
      }

      if (command.SmokoHabitType) {
        LifeCycleHabit.changeSmokoHabitType(command.SmokoHabitType);
      }

      await this.uow.startTransaction();

      await this.uow.writeRoommateProfileRepo.UpdateRoommateProfileForStudent(
        roommateProfile,
      );

      await this.uow.commitTransaction();

      return {
        message: "Roommate profile updated successfully",
      };
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("Error updating roommate profile:", error);
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
