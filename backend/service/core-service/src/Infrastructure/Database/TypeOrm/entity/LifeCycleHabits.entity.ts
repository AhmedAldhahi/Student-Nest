import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { GuestPolicy } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/GuestPolicy.enum";
import { PetType } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/pet.enum";
import { PetPreference } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/PetPreference.enum";
import { SharingLevel } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/SharingLevel.enum";
import { SmokingHabit } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/SmokingHabit.enum";
import { RoommateProfileModel } from "./RoommateProfile.entity";
import { DietaryPreference } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/DietaryPreference.enum";

@Entity("LifeCycleHabit")
export class LifeCycleHabitModel {
  @PrimaryColumn()
  habitId: string;

  @Column({ type: "enum", enum: GuestPolicy, nullable: true })
  guestPolicyType: GuestPolicy;

  @Column({ type: "enum", nullable: true, enum: PetType })
  pet: PetType;

  @Column({ type: "enum", enum: PetPreference, nullable: true })
  petPreferences: PetPreference;

  @Column({ type: "enum", nullable: true, enum: SharingLevel })
  sharingLevelType: SharingLevel;

  @Column({ type: "enum", nullable: true, enum: SmokingHabit })
  smokingType: SmokingHabit;

  @Column({ type: "enum", nullable: true, enum: DietaryPreference })
  FoodPreferenceType: DietaryPreference;

  @Column({ nullable: false })
  roommateProfileId: string;

  @OneToOne(() => RoommateProfileModel, (profile) => profile.lifeCycleHabit, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "roommateProfileId" })
  profile: RoommateProfileModel;
}
