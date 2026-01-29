import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IPasswordService } from "../../../Interfaces/IPassword.interface";
import { ITokenService } from "../../../Interfaces/IToken.interface";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { LoginUserResponse } from "../Dto/Response/LoginUserResponse";
import { UserLoginQueries } from "../Queries/UserLoginQueries";

export class UserLoginQueriesHandler
  implements IQueriesHandlers<UserLoginQueries>
{
  constructor(
    private readonly passwordService: IPasswordService,
    private readonly ReadUserRepo: IReadUserRepositories,
    private readonly tokenService: ITokenService
  ) {}

  public async handle(command: UserLoginQueries): Promise<LoginUserResponse> {
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

      const verifiedEmail = user.getVerifiedEmail();

      const payload = {
        userId: user.getUserId(),
      };

      const Token = this.tokenService.generateAccessToken(payload);

      return {
        message: "user login scussfuly",
        token: Token,
        verifiedEmail: verifiedEmail,
      };
    } catch (error: any) {
      console.error("failed to login to our app");
      throw error;
    }
  }
}
