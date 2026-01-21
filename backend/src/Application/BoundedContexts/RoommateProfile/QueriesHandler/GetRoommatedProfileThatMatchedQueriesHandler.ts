import { IReadStudentRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadStudentRepositories.repositories";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IReadRoommateProfileRepo } from "../../../../Domain/BoundedContexts/RommateProfile/Repositories/ReadRommateProfile.reposotries";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetRoommateProfileThatMatchedQueries } from "../Queries/GetRoommateProfileThatMatchQueries";

export class GetRoommateProfileThatMatched implements IQueriesHandlers<GetRoommateProfileThatMatchedQueries> {
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readStudentRepo: IReadStudentRepositories,
    private readonly readRoommateRepo: IReadRoommateProfileRepo,
  ) {}

  public async handle(
    query: GetRoommateProfileThatMatchedQueries,
  ): Promise<any> {
    try {
      // 1. Validate User Account
      const user = await this.readUserRepo.findById(query.userId);
      if (!user) throw new Error("User not found !!");
      user.ensureAccountIsActive();

      const student = await this.readStudentRepo.findStudentById(query.userId);
      if (!student) throw new Error("Student not found !!");

      if (student.getRoommateProfileStatus() === false) {
        throw new Error("You must create a roommate profile first to see matches !!");
      }

      const matches = await this.readRoommateRepo.FindStudentsRoommateProfiles(
        query.userId,
      );

      return matches;
      
    } catch (error: any) {
      console.error("Error in GetRoommateProfileThatMatched handler:", error);
      throw error;
    }
  }
}