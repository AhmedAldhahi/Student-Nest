import { DietaryPreference } from "../Enum/DietaryPreference.enum";
import { GuestPolicy } from "../Enum/GuestPolicy.enum";
import { PetType } from "../Enum/pet.enum";
import { PetPreference } from "../Enum/PetPreference.enum";
import { SharingLevel } from "../Enum/SharingLevel.enum";
import { SmokingHabit } from "../Enum/SmokingHabit.enum";
import { LifeCycleHabitData } from "../types/LifeCycleHabitData.type";

export class LifeCycleHabitEntity {
  private habitId: string;
  private roommateProfileId: string;
  private guestPolicyType?: GuestPolicy;
  private petType?: PetType;
  private petPreferenceType?: PetPreference;
  private FoodPreferenceType?: DietaryPreference;
  private SharingLevelType?: SharingLevel;
  private SmokoHabitType?: SmokingHabit;

  constructor(data: LifeCycleHabitData) {
    this.habitId = data.habitId;
    this.roommateProfileId = data.roommateProfileId;
    this.guestPolicyType = data.guestPolicyType;
    this.petPreferenceType = data.petPreferenceType;
    this.petType = data.petType;
    this.SharingLevelType = data.SharingLevelType;
    this.SmokoHabitType = data.SmokoHabitType;
    this.FoodPreferenceType = data.FoodPreferenceType;
  }

  //factory method
  public static create(data: LifeCycleHabitData) {
    return new LifeCycleHabitEntity(data);
  }

  /**
   * ==================================================================================
   *                              Behavior Methods sections
   * ==================================================================================
   */

  public changeGuestPolicyType(data: GuestPolicy): void {
    this.guestPolicyType = data;
  }

  public changePetType(data: PetType): void {
    this.petType = data;
  }

  public changePetPreferenceType(data: PetPreference): void {
    this.petPreferenceType = data;
  }

  public changeFoodPreferenceType(data: DietaryPreference): void {
    this.FoodPreferenceType = data;
  }

  public changeSharingLevelType(data: SharingLevel): void {
    this.SharingLevelType = data;
  }

  public changeSmokoHabitType(data: SmokingHabit): void {
    this.SmokoHabitType = data;
  }

  /**
   * ==================================================================================
   *                              Getter Methods sections
   * ==================================================================================
   */

  public getGuestPolicyType(): GuestPolicy | undefined {
    return this.guestPolicyType ?? undefined;
  }

  public getPetType(): PetType | undefined {
    return this.petType ?? undefined;
  }

  public getPetPreferenceType(): PetPreference | undefined {
    return this.petPreferenceType ?? undefined;
  }

  public getFoodPreferenceType(): DietaryPreference | undefined {
    return this.FoodPreferenceType ?? undefined;
  }

  public getSharingLevelType(): SharingLevel | undefined {
    return this.SharingLevelType ?? undefined;
  }

  public getSmokoHabitType(): SmokingHabit | undefined {
    return this.SmokoHabitType ?? undefined;
  }

  public getHabitId(): string {
    return this.habitId;
  }

  public getRoommateProfileId(): string {
    return this.roommateProfileId;
  }
}
