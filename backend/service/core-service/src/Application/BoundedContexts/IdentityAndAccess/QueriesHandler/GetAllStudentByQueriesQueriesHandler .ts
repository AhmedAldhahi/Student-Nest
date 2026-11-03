import { IReadStudentRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadStudentRepositories.repositories";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetUserQueriesQueries } from "../Queries/GetUserByQeries";

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
