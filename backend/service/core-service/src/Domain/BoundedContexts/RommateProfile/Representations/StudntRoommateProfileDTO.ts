import { LifeCycleHabitEntity } from "../Entities/LifeCycleHabbitEntity.entity";
import { DietaryPreference } from "../Enum/DietaryPreference.enum";
import { GuestPolicy } from "../Enum/GuestPolicy.enum";
import { NoiseTolerance } from "../Enum/Noise tolerance.enum";
import { PetType } from "../Enum/pet.enum";
import { PetPreference } from "../Enum/PetPreference.enum";
import { SharingLevel } from "../Enum/SharingLevel.enum";
import { SleepSchedule } from "../Enum/SleepSchedule.enum";
import { SmokingHabit } from "../Enum/SmokingHabit.enum";
import { UserLanguage } from "../Enum/UserLanguage.enum";

export interface StudentRoommateProfileDTO {
  Language: UserLanguage;
  bio?: string;
  UserAcceptNoiseTolerance: NoiseTolerance;
  UserSleepSchedule: SleepSchedule;
  minAge: string;
  maxAge: string;
  createAt: Date;
  guestPolicyType?: GuestPolicy;
  petType?: PetType;
  FoodPreferenceType?: DietaryPreference;
  petPreferenceType?: PetPreference;
  SharingLevelType?: SharingLevel;
  SmokoHabitType?: SmokingHabit;
}
