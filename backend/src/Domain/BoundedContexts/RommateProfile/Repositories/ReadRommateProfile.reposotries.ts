import { RoommateProfileAggregate } from "../Aggregates/RommateProfile.aggregateRoot";
import { FindStudentRoommateProfileDTO } from "../Representations/FindStudentRoommateDTO";
import { StudentRoommateProfileDTO } from "../Representations/StudntRoommateProfileDTO";

export interface IReadRoommateProfileRepo {
  FindStudentRoommateProfileById(
    userId: string,
  ): Promise<RoommateProfileAggregate | null>;

  FindStudentsRoommateProfiles(
    userId: string,
  ): Promise<FindStudentRoommateProfileDTO[]>;

  FindStudentsRoommateProfile(
    userId: string,
  ): Promise<StudentRoommateProfileDTO | null>;
}
