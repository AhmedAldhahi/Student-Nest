import { LifeCycleHabitEntity } from "../Entities/LifeCycleHabbitEntity.entity";
import { NoiseTolerance } from "../Enum/Noise tolerance.enum";
import { SleepSchedule } from "../Enum/SleepSchedule.enum";
import { UserLanguage } from "../Enum/UserLanguage.enum";
import { Age } from "../Value-Object/AgeValueObject.vo";

export type RoommateProfileData = {
  Language: UserLanguage;
  roommateId: string;
  bio?: string;
  UserAcceptNoiseTolerance: NoiseTolerance;
  UserSleepSchedule: SleepSchedule;
  minAge: Age;
  maxAge: Age;
  lifeHabit: LifeCycleHabitEntity;
  createAt: Date;
  studentId:string;
};
