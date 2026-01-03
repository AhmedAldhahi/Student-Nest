import { LoginRequest } from "../../DTO/shared/registeration/LoginRequest.dto";
import { LoginResponse } from "../../DTO/shared/registeration/LoginRespone.dto";
import { ITokenService } from "../../Interfaces/IToken.interface";
import { LoginQueriesHandler } from "../../Queries/Handlers/Identiy/LoginQueriesHandlers";

export class LoginUseCase {
  constructor(
    private readonly tokenService: ITokenService,
    private readonly QueriesHandler: LoginQueriesHandler
  ) {}
  public async execute(dto: LoginRequest): Promise<LoginResponse> {
    try {
      const user = await this.QueriesHandler.handle(dto);

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
    } catch (err: any) {
      if (err instanceof Error) {
        console.error(err.message);
      }
      throw err;
    }
  }
}
