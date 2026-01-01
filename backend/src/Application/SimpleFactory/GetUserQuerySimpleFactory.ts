import { UserRole } from "../../Domain/Shared/Enum/UserRole.enum";
import { GetAllLandlordByQueriesQueriesHandler } from "../Queries/Handlers/Housing/Landlord/GetAllLandlordByQueriesQueriesHandler";
import { GetAllStudentsByQueriesQueriesHandler } from "../Queries/Handlers/Student/GetAllStudentByQueriesQueriesHandler ";
import { GetUserQueriesQueries } from "../Queries/Queries/User/GetUserEmail.Queries";
export class GetUserEmailSimpleFactory {
  constructor(
    private readonly getLandlordQueriesQueryHandler: GetAllLandlordByQueriesQueriesHandler,
    private readonly getStudentsQueriesQueryHandler: GetAllStudentsByQueriesQueriesHandler
  ) {}

  public async getUsers(userRole: UserRole, Query: string) {
    try {
      const query = new GetUserQueriesQueries(Query);
      if (userRole === UserRole.landlord)
        return await this.getLandlordQueriesQueryHandler.handle(query);
      else if (userRole === UserRole.student)
        return await this.getStudentsQueriesQueryHandler.handle(query);
      else throw new Error("invalid role !!");
    } catch (error: any) {
      throw error;
    }
  }
}
