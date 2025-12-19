import { UserRole } from "../../Domain/Enum/UserRole.enum";
import { GetAllLandlordQueriesHandler } from "../Querie/Handlers/GetAllLandlordQueriesHandler";
import { GetAllStudentQueriesHandler } from "../Querie/Handlers/GetAllStudentQueriesHandler";

export class UserSimpleFactory {
  constructor(
    private readonly getAllLandlordQueryHandler: GetAllLandlordQueriesHandler,
    private readonly getAllStudentQueryHandler: GetAllStudentQueriesHandler
  ) {}

  public async getUsers(userRole: UserRole) {
    try {
      if (userRole === UserRole.landloard)
        return await this.getAllLandlordQueryHandler.handle();
      else if (userRole === UserRole.student)
        return await this.getAllStudentQueryHandler.handle();
      else throw new Error("invalid role !!");
    } catch (error: any) {
      throw error;
    }
  }
}
