import { IQueriesHandlers } from "../IQuerieHandlers";
import { GetUserQueriesQueries } from "../Queries/GetUserEmail.Queries";
import { IReadStudentRepositories } from "../../../Domain/Repositories/Read/ReadStudentRepositories.repositories";

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
