import { LifeCycleHabitEntity } from "../../../Domain/BoundedContexts/RommateProfile/Entities/LifeCycleHabbitEntity.entity";
import { LifeCycleHabitModel } from "../../Database/TypeOrm/entity/LifeCycleHabits.entity";

export class LifeCycleHabitMapper {
  public static toModel(entity: LifeCycleHabitEntity): LifeCycleHabitModel {
    const model = new LifeCycleHabitModel();
    const validateDate = this.validateModel(entity);

    model.habitId = entity.getHabitId();
    model.guestPolicyType = validateDate.UserGuestPolicy;
    model.pet = validateDate.userPets;
    model.petPreferences = validateDate.userPetPreferences;
    model.sharingLevelType = validateDate.userSharingLevelType;
    model.smokingType = validateDate.userSmokingType;
    model.FoodPreferenceType = validateDate.foodType;
    model.roommateProfileId = entity.getRoommateProfileId();

    return model;
  }

  public static validateModel(entity: LifeCycleHabitEntity) {
    const UserGuestPolicy = entity.getGuestPolicyType();
    const userPets = entity.getPetType();
    const userPetPreferences = entity.getPetPreferenceType();
    const userSharingLevelType = entity.getSharingLevelType();
    const userSmokingType = entity.getSmokoHabitType();
    const foodType = entity.getFoodPreferenceType();

    if (!userPetPreferences)
      throw new Error("cannot save habit, user pet preferences habit !!");
    if (!userPets) throw new Error("cannot save habit, user pet require ");
    if (!userSharingLevelType)
      throw new Error("cannot save habit ,user sharing require !!");
    if (!userSmokingType)
      throw new Error("cannot save habit, user smoking type require !!");
    if (!UserGuestPolicy)
      throw new Error("cannot save habit, user Guest Policy is require !!");

    if (!foodType)
      throw new Error("cannot save habit, food type for user is require !!");

    return {
      userPetPreferences,
      userPets,
      userSmokingType,
      userSharingLevelType,
      UserGuestPolicy,
      foodType,
    };
  }

  public static toEntity(model: LifeCycleHabitModel): LifeCycleHabitEntity {
    return new LifeCycleHabitEntity({
      habitId: model.habitId,
      guestPolicyType: model.guestPolicyType,
      petType: model.pet,
      petPreferenceType: model.petPreferences,
      FoodPreferenceType: model.FoodPreferenceType,
      SharingLevelType: model.sharingLevelType,
      SmokoHabitType: model.smokingType,
      roommateProfileId: model.roommateProfileId
    });
  }
}
