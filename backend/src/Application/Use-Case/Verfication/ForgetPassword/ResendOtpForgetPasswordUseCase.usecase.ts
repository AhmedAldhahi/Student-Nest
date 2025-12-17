import { ResendOtpForgetPassCommandHandler } from "../../../Command/Handlers/ResendOtpForgetPassCommandHandler";
import { ResendOtpRequest } from "../../../Dtos/password-recover/ResendOtpRequest.dto";
import { ResendOtpRespone } from "../../../Dtos/password-recover/ResendOtpRespone.dto";
import { IEmailService } from "../../../Interfaces/IEmail.interface";

export class ResendOtpForgetPasswordUseCase {
  constructor(
    private readonly emailService: IEmailService,
    private readonly commandHandler: ResendOtpForgetPassCommandHandler
  ) {}

  public async excute(dto: ResendOtpRequest): Promise<ResendOtpRespone> {
    try {
      const value = await this.commandHandler.handle(dto);
      const { user, otpvalue } = value;

      // Send OTP email after saving to DB
      await this.emailService.sendPasswordResetEmail(user.getEmail(), otpvalue);

      return {
        message: "OTP has been resent successfully. Check your email.",
      };
    } catch (err: any) {
      console.error("Failed to resend OTP code:", err.message);
      throw err;
    }
  }
}
