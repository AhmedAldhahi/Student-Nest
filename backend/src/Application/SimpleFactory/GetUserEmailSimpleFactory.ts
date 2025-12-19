import { UserRole } from "../../Domain/Enum/UserRole.enum";
import { GetAllLandlordByEmailQueriesHandler } from "../Querie/Handlers/GetAllLandlordByEmailQueriesHandler";
import { GetAllStudentsByEmailQueriesHandler } from "../Querie/Handlers/GetAllStudentByEmailQueriesHandler ";
import { GetUserEmailQueries } from "../Querie/Queries/GetUserEmail.Queries";

export class GetUserEmailSimpleFactory {
  constructor(
    private readonly getLandlordEmailQueryHandler: GetAllLandlordByEmailQueriesHandler,
    private readonly getStudentsEmailQueryHandler: GetAllStudentsByEmailQueriesHandler
  ) {}

  public async getUsers(userRole: UserRole, email: string) {
    try {
      const query = new GetUserEmailQueries(email);
      if (userRole === UserRole.landloard)
        return await this.getLandlordEmailQueryHandler.handle(query);
      else if (userRole === UserRole.student)
        return await this.getStudentsEmailQueryHandler.handle(query);
      else throw new Error("invalid role !!");
    } catch (error: any) {
      throw error;
    }
  }
}
