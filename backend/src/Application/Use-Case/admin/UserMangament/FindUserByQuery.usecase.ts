import { UserRole } from "../../../../Domain/Shared/Enum/UserRole.enum";
import { GetUserEmailSimpleFactory } from "../../../SimpleFactory/GetUserQuerySimpleFactory";

export class FindUserByQueryUseCase {
  constructor(
    private GetUsersEmailFactory: GetUserEmailSimpleFactory,
  ) {}

  public async execute(query: string, role: UserRole) {
    const results = await this.GetUsersEmailFactory.getUsers(role, query);

    if (!results || results.length === 0) {
      throw new Error("no user found !!");
    }

    return results;
  }
}
