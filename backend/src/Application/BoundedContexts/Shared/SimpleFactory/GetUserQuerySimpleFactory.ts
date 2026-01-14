import { UserRole } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Enum/UserRole.enum";
import { GetAllLandlordByQueriesQueriesHandler } from "../../IdentityAndAccess/QueriesHandler/GetAllLandlordByQueriesQueriesHandler";
import { GetAllStudentsByQueriesQueriesHandler } from "../../IdentityAndAccess/QueriesHandler/GetAllStudentByQueriesQueriesHandler ";
import { GetUserQueriesQueries } from "../../IdentityAndAccess/Queries/GetUserByQeries";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
export class GetUserQueriesSimpleFactory {
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly getLandlordQueriesQueryHandler: GetAllLandlordByQueriesQueriesHandler,
    private readonly getStudentsQueriesQueryHandler: GetAllStudentsByQueriesQueriesHandler
  ) {}

  public async getUsers(userId: string, Role: UserRole, Query: string) {
    try {

      const user = await this.readUserRepo.findById(userId);
      if (!user) throw Error("no user been found !!");
      
      const query = new GetUserQueriesQueries(Query);
      if (Role === UserRole.landlord)
        return await this.getLandlordQueriesQueryHandler.handle(query);
      else if (Role === UserRole.student)
        return await this.getStudentsQueriesQueryHandler.handle(query);
      else throw new Error("invalid role !!");
    } catch (error: any) {
      throw error;
    }
  }
}
