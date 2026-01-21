import { DietaryPreference } from "../Enum/DietaryPreference.enum";
import { GuestPolicy } from "../Enum/GuestPolicy.enum";
import { PetType } from "../Enum/pet.enum";
import { PetPreference } from "../Enum/PetPreference.enum";
import { SharingLevel } from "../Enum/SharingLevel.enum";
import { SmokingHabit } from "../Enum/SmokingHabit.enum";

export type LifeCycleHabitData = {
  habitId: string;
  roommateProfileId:string;
  guestPolicyType?: GuestPolicy;
  petType?: PetType;
  FoodPreferenceType?: DietaryPreference;
  petPreferenceType?: PetPreference;
  SharingLevelType?: SharingLevel;
  SmokoHabitType?: SmokingHabit;
};
