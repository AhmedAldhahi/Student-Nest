import { IReadStudentRepositories } from "../../../Domain/Repositories/Read/ReadStudentRepositories.repositories";
import { IQueriesHandlers } from "../IQuerieHandlers";
import { GetUserProfileQueries } from "../Queries/GetUserProfileQueries";

export class GetStudentQueriesHandlers
  implements IQueriesHandlers<GetUserProfileQueries>
{
  constructor(private readonly readStudent: IReadStudentRepositories) {}

  public async handle(command: GetUserProfileQueries) {
    try {
      const user = await this.readStudent.findStudentById(command.userId);

      if (!user) throw new Error("no user found !!");

      return {
        user: {
          userId: user.getUser().getUserId(),
          email: user.getUser().getEmail(),
          name: user.getUser().getName(),
          role: user.getUser().getRole(),
          dateOfBirth: user.getUser().getDateOfBirth(),
          phoneNumber: user.getUser().getPhoneNumber(),

          address: user.getUser().getAddress(),
          photo: user.getUser().getPhoto() || null,
          createdAt: user.getUser().getCreatedAt(),
        },

        major: user.getMajor(),
        gradateYear: user.getGraduateYear(),
        studentCardId: user.getStudentCardID(),
        universityName: user.getUniversityName(),
        studentGovId: user.getGovernmentId(),
        verificationFile: user.getVerificationDocument(),
      };
    } catch (error: any) {
      console.error("failed to fetch student from  our app");
      throw error;
    }
  }
}
