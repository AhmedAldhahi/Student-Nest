import { ITokenService } from "../../../Interfaces/IToken.interface";
import { UpdateForgetPasswordCommandHandler } from "../../../Command/Handlers/Identiy/UpdateForgetPasswordCommandHandler";
import { ForgetPasswordRequest } from "../../../DTO/verfication/ForgetPasswordRequest.dto";
import { ForgetPasswordResponse } from "../../../DTO/verfication/ForgetPasswordRespone.dto";

export class ForgetPasswordUseCase {
  constructor(
    private readonly tokenService: ITokenService,
    private readonly commandHandler: UpdateForgetPasswordCommandHandler
  ) {}

  public async execute(
    dto: ForgetPasswordRequest
  ): Promise<ForgetPasswordResponse> {
    try {
      const user = await this.commandHandler.handle(dto);

      const payload = {
        userId: user.getUserId(),
      };

      const Token = await this.tokenService.generateAccessToken(payload);

      return {
        message: "user password been update scussfuly ",
        token: Token,
      };
    } catch (err: any) {
      if (err instanceof Error) {
        console.error("failed to update  password !!", err);
      }

      throw err;
    }
  }
}
