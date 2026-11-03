import { GetAllStudentQueriesHandler } from "../../IdentityAndAccess/QueriesHandler/GetAllStudentQueriesHandler";
import { GetAllLandlordQueriesHandler } from "../../IdentityAndAccess/QueriesHandler/GetAllLandlordQueriesHandler";
import { UserRole } from "../../../../Domain/Shared/Enum/UserRole.enum";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
export class UserSimpleFactory {
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly getAllLandlordQueryHandler: GetAllLandlordQueriesHandler,
    private readonly getAllStudentQueryHandler: GetAllStudentQueriesHandler
  ) {}

  public async getUsers(userId: string,Role: UserRole) {
    try { 

      const user = await this.readUserRepo.findById(userId);
      if (!user) throw Error ("no user been found !!");

      if (Role === UserRole.landlord)
        return await this.getAllLandlordQueryHandler.handle();
      else if (Role === UserRole.student)
        return await this.getAllStudentQueryHandler.handle();
      else throw new Error("invalid role !!");
    } catch (error: any) {
      throw error;
    }
  }


}
