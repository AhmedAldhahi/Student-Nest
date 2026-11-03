import { RoommateProfileAggregate } from "../Aggregates/RommateProfile.aggregateRoot";

export interface IWriteRoommateProfile {
  AddRoommateProfileForStudent(
    profile: RoommateProfileAggregate,
  ): Promise<void>;

  UpdateRoommateProfileForStudent(
    profile: RoommateProfileAggregate,
  ): Promise<void>;
}
