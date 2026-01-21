import { z } from "zod";
import { UserLanguage } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/UserLanguage.enum";
import { NoiseTolerance } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/Noise tolerance.enum";
import { SleepSchedule } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/SleepSchedule.enum";
import { GuestPolicy } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/GuestPolicy.enum";
import { PetType } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/pet.enum";
import { DietaryPreference } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/DietaryPreference.enum";
import { PetPreference } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/PetPreference.enum";
import { SharingLevel } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/SharingLevel.enum";
import { SmokingHabit } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/SmokingHabit.enum";

export const RoommateProfileSchema = z
  .object({
    Language: z.enum(UserLanguage, "Invalid Language selection"),
    bio: z.string().optional(),
    UserAcceptNoiseTolerance: z.enum(
      NoiseTolerance,
      "Invalid Noise Tolerance Selection",
    ),
    UserSleepSchedule: z.enum(
      SleepSchedule,
      "Invalid Sleep Schedule selection",
    ),
    minAge: z.string(),
    maxAge: z.string(),
    guestPolicyType: z.enum(GuestPolicy).optional(),
    petType: z.enum(PetType).optional(),
    FoodPreferenceType: z.enum(DietaryPreference).optional(),
    petPreferenceType: z.enum(PetPreference).optional(),
    SharingLevelType: z.enum(SharingLevel).optional(),
    SmokoHabitType: z.enum(SmokingHabit).optional(),
  })
  .strict();

export const UpdateRoommateProfileSchema = z
  .object({
    Language: z.enum(UserLanguage, "Invalid Language selection").optional(),
    bio: z.string().optional(),
    UserAcceptNoiseTolerance: z
      .enum(NoiseTolerance, "Invalid Noise Tolerance Selection")
      .optional(),
    UserSleepSchedule: z.enum(
      SleepSchedule,
      "Invalid Sleep Schedule selection",
    ).optional(),
    minAge: z.string().optional(),
    maxAge: z.string().optional(),
    guestPolicyType: z.enum(GuestPolicy).optional(),
    petType: z.enum(PetType).optional(),
    FoodPreferenceType: z.enum(DietaryPreference).optional(),
    petPreferenceType: z.enum(PetPreference).optional(),
    SharingLevelType: z.enum(SharingLevel).optional(),
    SmokoHabitType: z.enum(SmokingHabit).optional(),
  })
  .strict();
