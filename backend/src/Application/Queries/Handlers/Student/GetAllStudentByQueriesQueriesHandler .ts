import { IQueriesHandlers } from "../../IQueriesHandlers";
import { GetUserQueriesQueries } from "../../Queries/User/GetUserEmail.Queries";
import { IReadStudentRepositories } from "../../../../Domain/Modules/Student/Repositories/ReadStudentRepositories.repositories";

export class GetAllStudentsByQueriesQueriesHandler
  implements IQueriesHandlers<GetUserQueriesQueries>
{
  constructor(private readonly readStudentRepo: IReadStudentRepositories) {}

  public async handle(command: GetUserQueriesQueries): Promise<any> {
    try {
      const students = await this.readStudentRepo.searchByQuery(command.query);
      return students;
    } catch (error: any) {
      console.error("fail to fetch students !!");
      throw error;
    }
  }
}
