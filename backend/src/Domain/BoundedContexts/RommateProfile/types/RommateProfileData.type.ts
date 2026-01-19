import { NoiseTolerance } from "../Enum/Noise tolerance.enum";
import { SleepSchedule } from "../Enum/SleepSchedule.enum";
import { UserLanguage } from "../Enum/UserLanguage.enum";

export type RoommateProfileData = {
  Language: UserLanguage;
  roommateId: string;
  bio: string;
  UserAcceptNoiseTolerance: NoiseTolerance;
  UserSleepSchedule: SleepSchedule;
  minAge: number;
  maxAge: number;
  //lifeHabit:string;
  createAt: Date
};
