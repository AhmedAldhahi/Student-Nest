import { IReadUserRepositories } from "../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { IReadStudentRepositories } from "../../../../Domain/Modules/Student/Repositories/ReadStudentRepositories.repositories";
import { IQueriesHandlers } from "../../IQueriesHandlers";
import { GetUserProfileQueries } from "../../Queries/User/GetUserProfileQueries";

export class GetStudentQueriesHandlers
  implements IQueriesHandlers<GetUserProfileQueries>
{
  constructor(
    private readonly readStudent: IReadStudentRepositories,
    private readonly readUserRepo: IReadUserRepositories
  ) {}

  public async handle(command: GetUserProfileQueries) {
    try {
      const student = await this.readStudent.findStudentById(command.userId);

      if (!student) throw new Error("no student found !!");

      const user = await this.readUserRepo.findById(command.userId);

      if (!user) throw new Error("no user found !!");

      return {
        user: {
          userId: user.getUserId(),
          email: user.getEmail(),
          name: user.getName(),
          role: user.getRole(),
          dateOfBirth: user.getDateOfBirth(),
          phoneNumber: user.getPhoneNumber(),

          address: user.getAddress(),
          photo: user.getPhoto() || null,
          createdAt: user.getCreatedAt(),
        },

        major: student.getMajor(),
        gradateYear: student.getGraduateYear(),
        studentCardId: student.getStudentCardID(),
        universityName: student.getUniversityName(),
        studentGovId: student.getGovernmentId(),
        verificationFile: student.getVerificationDocument(),
      };
    } catch (error: any) {
      console.error("failed to fetch student from  our app");
      throw error;
    }
  }
}
