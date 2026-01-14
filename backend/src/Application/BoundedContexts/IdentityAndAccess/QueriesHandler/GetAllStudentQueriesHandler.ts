import { IReadStudentRepositories, StudentResponseDto } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadStudentRepositories.repositories";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetAllUser } from "../Queries/GetAllUser";

export class GetAllStudentQueriesHandler
  implements IQueriesHandlers<GetAllUser>
{
  constructor(private readonly ReadStudents: IReadStudentRepositories) {}

  public async handle(): Promise<StudentResponseDto[] | null> {
    try {
      const students = await this.ReadStudents.findAllStudent();

      return students;
    } catch (error: any) {
      console.error("fail to fetch students !!");
      throw error;
    } 
  }
}
