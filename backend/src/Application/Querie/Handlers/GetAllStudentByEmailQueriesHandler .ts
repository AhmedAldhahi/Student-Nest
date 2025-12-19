import { IQueriesHandlers } from "../IQuerieHandlers";
import { GetUserEmailQueries } from "../Queries/GetUserEmail.Queries";
import { IReadStudentRepositories } from "../../../Domain/Repositories/Read/ReadStudentRepositories.repositories";

export class GetAllStudentsByEmailQueriesHandler
  implements IQueriesHandlers<GetUserEmailQueries>
{
  constructor(private readonly readStudentRepo: IReadStudentRepositories) {}

  public async handle(command: GetUserEmailQueries): Promise<any> {
    try {
      const students = await this.readStudentRepo.searchByEmail(command.email);
      return students;
    } catch (error: any) {
      console.error("fail to fetch students !!");
      throw error;
    }
  }
}
