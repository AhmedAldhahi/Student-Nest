import { VerifiedOTpRequest } from "../../../Dtos/Email-verfied/VerfiedOtpRequest.dto";
import { VerifiedOTPForgetPassCommandHandler } from "../../../Command/Handlers/VerfiedOtpResetPassCommandHandler";

export class VerifiedForgetPasswordOtpUseCase {
  constructor(
    private readonly commandHandler: VerifiedOTPForgetPassCommandHandler
  ) {}

  public async execute(dto: VerifiedOTpRequest) {
    try {
      await this.commandHandler.handle(dto);

      return {
        message: "OTP verified successfully, update your password now ",
      };
    } catch (err) {
      console.error("OTP verification failed:", err);
      throw err;
    }
  }
}
