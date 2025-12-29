import { IReadStudentRepositories } from "../../../Domain/Repositories/Read/ReadStudentRepositories.repositories";
import { StudentResponseDto } from "../../DTO/profile/StudentResponseDto";
import { IQueriesHandlers } from "../IQueriesHandlers";
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
