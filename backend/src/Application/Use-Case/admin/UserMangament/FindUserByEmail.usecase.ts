import { UserRole } from "../../../../Domain/Enum/UserRole.enum";
import { GetUserEmailSimpleFactory } from "../../../SimpleFactory/GetUserEmailSimpleFactory";

export class FindUserByEmailUseCase {
  constructor(
    private GetUsersEmailFactory: GetUserEmailSimpleFactory,
  ) {}

  public async execute(email: string, role: UserRole) {
    const results = await this.GetUsersEmailFactory.getUsers(role, email);

    if (!results || results.length === 0) {
      throw new Error("no user found !!");
    }

    return results;
  }
}
