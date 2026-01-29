import { LifeCycleHabitEntity } from "../../../../../Domain/BoundedContexts/RommateProfile/Entities/LifeCycleHabbitEntity.entity";
import { DietaryPreference } from "../../../../../Domain/BoundedContexts/RommateProfile/Enum/DietaryPreference.enum";
import { GuestPolicy } from "../../../../../Domain/BoundedContexts/RommateProfile/Enum/GuestPolicy.enum";
import { NoiseTolerance } from "../../../../../Domain/BoundedContexts/RommateProfile/Enum/Noise tolerance.enum";
import { PetType } from "../../../../../Domain/BoundedContexts/RommateProfile/Enum/pet.enum";
import { PetPreference } from "../../../../../Domain/BoundedContexts/RommateProfile/Enum/PetPreference.enum";
import { SharingLevel } from "../../../../../Domain/BoundedContexts/RommateProfile/Enum/SharingLevel.enum";
import { SleepSchedule } from "../../../../../Domain/BoundedContexts/RommateProfile/Enum/SleepSchedule.enum";
import { SmokingHabit } from "../../../../../Domain/BoundedContexts/RommateProfile/Enum/SmokingHabit.enum";
import { UserLanguage } from "../../../../../Domain/BoundedContexts/RommateProfile/Enum/UserLanguage.enum";

export interface UpdateRoommateProfileRequest {
  Language?: UserLanguage;
  bio?: string;
  UserAcceptNoiseTolerance?: NoiseTolerance;
  UserSleepSchedule?: SleepSchedule;
  minAge?: string;
  maxAge?: string;
  lifeHabit?: LifeCycleHabitEntity;
  createAt: Date;

  guestPolicyType?: GuestPolicy;
  petType?: PetType;
  FoodPreferenceType?: DietaryPreference;
  petPreferenceType?: PetPreference;
  SharingLevelType?: SharingLevel;
  SmokoHabitType?: SmokingHabit;
}
