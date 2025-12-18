import { UserRole } from "../../../../Domain/Enum/UserRole.enum";
import { UserSimpleFactory } from "../../../SimpleFactory/GetUsersSimpleFactory";

export class GetAllUserUseCase {
  constructor(private readonly simpleUserFactory: UserSimpleFactory) {}

  public async execute(userRole: UserRole) {
    try {
      return await this.simpleUserFactory.getUsers(userRole);
    } catch (error: any) {
      throw error;
    }
  }
}
