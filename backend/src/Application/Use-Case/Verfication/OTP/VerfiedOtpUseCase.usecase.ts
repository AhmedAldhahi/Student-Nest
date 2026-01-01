import { VerifiedOTpRequest } from "../../../DTO/Email-verfied/VerfiedOtpRequest.dto";
import {
  ITokenPayload,
  ITokenService,
} from "../../../Interfaces/IToken.interface";
import { VerifiedOTpResponse } from "../../../DTO/Email-verfied/VerifiedOtpRespone.dto";
import { VerifiedOtpCommandHandler } from "../../../Command/Handlers/Identiy/VerfiedOtpCommandHandler";

export class VerifiedOtpUseCase {
  constructor(
    private readonly tokenService: ITokenService,
    private readonly commandHandler: VerifiedOtpCommandHandler
  ) {}

  public async execute(dto: VerifiedOTpRequest): Promise<VerifiedOTpResponse> {
    try {
      const user = await this.commandHandler.handle(dto);

      const payload: ITokenPayload = { userId: user.getUserId() };
      const token = this.tokenService.generateAccessToken(payload);

      return {
        message: "Email verified successfully.",
        token,
      };
    } catch (error) {
      console.error("fail to verified otp ");
      throw error;
    }
  }
}
