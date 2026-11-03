import { IReadStudentRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadStudentRepositories.repositories";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IReadRoommateProfileRepo } from "../../../../Domain/BoundedContexts/RommateProfile/Repositories/ReadRommateProfile.reposotries";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetRoommateProfileQueries } from "../Queries/GetRoommateProfileQueries";

export class GetRoommateProfileQueriesHandler implements IQueriesHandlers<GetRoommateProfileQueries> {
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readStudentRepo: IReadStudentRepositories,
    private readonly readRoommateProfileRepo: IReadRoommateProfileRepo,
  ) {}

  public async handle(command: GetRoommateProfileQueries): Promise<any> {
    try {
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("no user been found !!");

      const student = await this.readStudentRepo.findStudentById(
        command.userId,
      );
      if (!student) throw new Error("no student been found !!");

      user.ensureAccountIsActive();

      return await this.readRoommateProfileRepo.FindStudentsRoommateProfile(
        command.userId,
      );
    } catch (error: any) {
      console.error("fail to get accredit profiles !!", error);
      throw error;
    }
  }
}
