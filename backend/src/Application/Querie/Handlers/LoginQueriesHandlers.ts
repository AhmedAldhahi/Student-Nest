import { IReadUserRepositories } from "../../../Domain/Repositories/Read/ReadUserRepositories.repositories";
import { IPasswordService } from "../../Interfaces/IPassword.interface";
import { IQueriesHandlers } from "../IQuerieHandlers";
import { LoginUserQueries } from "../Queries/LoginUserQueries";

export class LoginQueriesHandler implements IQueriesHandlers<LoginUserQueries> {
  constructor(
    private readonly passwordService: IPasswordService,
    private readonly ReadUserRepo: IReadUserRepositories
  ) {}

  public async handle(command: LoginUserQueries): Promise<any> {
    try {
      const user = await this.ReadUserRepo.findByEmail(command.email);

      if (!user) {
        throw new Error("the password or email not correct");
      }

      const isValid = await this.passwordService.compare(
        command.password,
        user.getPass()
      );

      if (!isValid) {
        throw new Error("the password or email not correct");
      }

      return user;
      
    } catch (error: any) {
      console.error("failed to login to our app");
      throw error;
    }
  }
}
