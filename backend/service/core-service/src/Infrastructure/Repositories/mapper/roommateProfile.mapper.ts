import { RoommateProfileAggregate } from "../../../Domain/BoundedContexts/RommateProfile/Aggregates/RommateProfile.aggregateRoot";
import { StudentRoommateProfileDTO } from "../../../Domain/BoundedContexts/RommateProfile/Representations/StudntRoommateProfileDTO";
import { Age } from "../../../Domain/BoundedContexts/RommateProfile/Value-Object/AgeValueObject.vo";
import { LifeCycleHabitModel } from "../../Database/TypeOrm/entity/LifeCycleHabits.entity";
import { RoommateProfileModel } from "../../Database/TypeOrm/entity/RoommateProfile.entity";
import { LifeCycleHabitMapper } from "./lifeCycleHabit.mapper";

export class RoommateProfileMapper {
  public static toModel(
    entity: RoommateProfileAggregate,
  ): RoommateProfileModel {
    const model = new RoommateProfileModel();
    const validateData = this.ValidateModel(entity);

    model.RoommateProfileId = entity.getRoommateId();
    model.language = entity.getLanguage();
    model.maxAge = validateData.maxAge;
    model.minAge = validateData.minAge;
    model.noiseTolerance = entity.getNoiseTolerance();
    model.sleepSchedule = entity.getSleepSchedule();
    model.bio = validateData.bio;
    model.createAt = entity.getCreateAt();
    model.studentId = entity.getStudentId();

    const habitModel = LifeCycleHabitMapper.toModel(entity.getLifeCycleHabit());
    habitModel.profile = model;
    model.lifeCycleHabit = habitModel;

    return model;
  }

  public static toEntity(
    model: RoommateProfileModel,
  ): RoommateProfileAggregate {
    return new RoommateProfileAggregate({
      roommateId: model.RoommateProfileId,
      Language: model.language,
      UserAcceptNoiseTolerance: model.noiseTolerance,
      minAge: Age.create(model.minAge),
      maxAge: Age.create(model.maxAge),
      UserSleepSchedule: model.sleepSchedule,
      lifeHabit: LifeCycleHabitMapper.toEntity(model.lifeCycleHabit),
      createAt: model.createAt,
      bio: model.bio,
      studentId: model.studentId,
    });
  }

  public static toResponse(
    model: RoommateProfileModel,
  ): StudentRoommateProfileDTO {
    const lifeCycleHabitModel = new LifeCycleHabitModel();

    return {
      Language: model.language,
      bio: model.bio,
      UserAcceptNoiseTolerance: model.noiseTolerance,
      UserSleepSchedule: model.sleepSchedule,
      minAge: model.minAge,
      maxAge: model.maxAge,
      createAt: model.createAt,

      guestPolicyType: lifeCycleHabitModel.guestPolicyType,
      petType: lifeCycleHabitModel.pet,
      FoodPreferenceType: lifeCycleHabitModel.FoodPreferenceType,
      petPreferenceType: lifeCycleHabitModel.petPreferences,
      SharingLevelType: lifeCycleHabitModel.sharingLevelType,
      SmokoHabitType: lifeCycleHabitModel.smokingType,
    };
  }

  public static ValidateModel(entity: RoommateProfileAggregate) {
    const minAge = entity.getMinAge();
    const maxAge = entity.getMaxAge();
    const bio = entity.getBio();

    if (!minAge)
      throw new Error("cannot save roommate profile, min age is require !!");
    if (!maxAge)
      throw new Error("cannot save roommate profile , max age is require !!");

    if (!bio) throw new Error("cannot save roommate is require !!");

    return { maxAge, minAge, bio };
  }
}
