import { v4 as uuidv4 } from "uuid";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { LifeCycleHabitEntity } from "../../../../Domain/BoundedContexts/RommateProfile/Entities/LifeCycleHabbitEntity.entity";
import { IReadRoommateProfileRepo } from "../../../../Domain/BoundedContexts/RommateProfile/Repositories/ReadRommateProfile.reposotries";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { CreateRoommateProfileCommand } from "../Command/CreateRoommateProfileCommand";
import { createRoommateResponse } from "../Dto/Response/CreateRommateResponse";
import { RoommateProfileAggregate } from "../../../../Domain/BoundedContexts/RommateProfile/Aggregates/RommateProfile.aggregateRoot";
import { Age } from "../../../../Domain/BoundedContexts/RommateProfile/Value-Object/AgeValueObject.vo";
import { IReadStudentRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadStudentRepositories.repositories";

export class CreateRoommateProfileCommandHandler implements ICommandHandlers<CreateRoommateProfileCommand> {
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readStudentRepo: IReadStudentRepositories,
    private readonly readRoommateProfileRepo: IReadRoommateProfileRepo,
    private readonly uow: IUnitOfWork,
  ) {}

  public async handle(
    command: CreateRoommateProfileCommand,
  ): Promise<createRoommateResponse> {
    try {
      // 1. Validations
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("no user been found !!");
      user.ensureAccountIsActive();

      const student = await this.readStudentRepo.findStudentById(
        command.userId,
      );
      if (!student) throw new Error("no student been found !!");

      const existingProfile =
        await this.readRoommateProfileRepo.FindStudentRoommateProfile(
          command.userId,
        );
      if (existingProfile)
        throw new Error("this student already have roommate profile !!");

      const roommateProfileId = command.userId;

      const lifeHabitId = uuidv4();

      // 3. Create Habit Entity
      const lifeHabit = new LifeCycleHabitEntity({
        habitId: lifeHabitId,
        roommateProfileId: roommateProfileId,
        guestPolicyType: command.guestPolicyType,
        petType: command.petType,
        petPreferenceType: command.petPreferenceType,
        FoodPreferenceType: command.FoodPreferenceType,
        SharingLevelType: command.SharingLevelType,
        SmokoHabitType: command.SmokoHabitType,
      });

      // 4. Create Aggregate Root
      const roommateProfile = RoommateProfileAggregate.create({
        roommateId: roommateProfileId, 
        Language: command.Language,
        bio: command.bio,
        UserAcceptNoiseTolerance: command.UserAcceptNoiseTolerance,
        UserSleepSchedule: command.UserSleepSchedule,
        createAt: new Date(),
        minAge: Age.create(command.minAge),
        maxAge: Age.create(command.maxAge),
        lifeHabit: lifeHabit,
        studentId: command.userId,
      });

      // 5. Update State & Persist
      student.createRoommateProfile(roommateProfile);
      student.markAsRoommateProfileCreated();

      await this.uow.startTransaction();
      await this.uow.writeRoommateProfileRepo.AddRoommateProfileForStudent(
        roommateProfile,
      );
      await this.uow.commitTransaction();

      return {
        message: "roommate profile created successfully",
      };
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to create roommate profile !!", error);
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
