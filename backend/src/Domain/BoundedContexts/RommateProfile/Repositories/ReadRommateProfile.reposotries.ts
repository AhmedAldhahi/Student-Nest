import { RoommateProfileAggregate } from "../Aggregates/RommateProfile.aggregateRoot";

export interface IReadRoommateProfileRepo {
  FindStudentRoommateProfile(
    userId: string,
  ): Promise<RoommateProfileAggregate | null>;
}
