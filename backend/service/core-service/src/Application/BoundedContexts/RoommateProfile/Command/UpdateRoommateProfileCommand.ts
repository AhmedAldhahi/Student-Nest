import { LifeCycleHabitEntity } from "../../../../Domain/BoundedContexts/RommateProfile/Entities/LifeCycleHabbitEntity.entity";
import { DietaryPreference } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/DietaryPreference.enum";
import { GuestPolicy } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/GuestPolicy.enum";
import { NoiseTolerance } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/Noise tolerance.enum";
import { PetType } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/pet.enum";
import { PetPreference } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/PetPreference.enum";
import { SharingLevel } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/SharingLevel.enum";
import { SleepSchedule } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/SleepSchedule.enum";
import { SmokingHabit } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/SmokingHabit.enum";
import { UserLanguage } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/UserLanguage.enum";
import { ICommand } from "../../Shared/abstraction/ICommand";
import { UpdateRoommateProfileRequest } from "../Dto/Request/UpdateRoommateRequest";

export class UpdateRoommateProfileCommand implements ICommand {
  public Language?: UserLanguage;
  public bio?: string;
  public UserAcceptNoiseTolerance?: NoiseTolerance;
  public UserSleepSchedule?: SleepSchedule;
  public minAge?: string;
  public maxAge?: string;
  public lifeHabit?: LifeCycleHabitEntity;
  public createAt?: Date;
  public userId: string;
  public guestPolicyType?: GuestPolicy;
  public petType?: PetType;
  public FoodPreferenceType?: DietaryPreference;
  public petPreferenceType?: PetPreference;
  public SharingLevelType?: SharingLevel;
  public SmokoHabitType?: SmokingHabit;

  constructor(data: UpdateRoommateProfileRequest, userId: string) {
    this.Language = data.Language;
    this.bio = data.bio;
    this.UserAcceptNoiseTolerance = data.UserAcceptNoiseTolerance;
    this.UserSleepSchedule = data.UserSleepSchedule;
    this.minAge = data.minAge;
    this.maxAge = data.maxAge;
    this.lifeHabit = data.lifeHabit;
    this.createAt = data.createAt;
    this.userId = userId;
    this.guestPolicyType = data.guestPolicyType;
    this.petType = data.petType;
    this.petPreferenceType = data.petPreferenceType;
    this.FoodPreferenceType = data.FoodPreferenceType;
    this.SharingLevelType = data.SharingLevelType;
    this.SmokoHabitType = data.SmokoHabitType;
  }
}
