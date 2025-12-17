import { IEmailService } from "../../../Interfaces/IEmail.interface";
import { ResendOtpRequest } from "../../../Dtos/password-recover/ResendOtpRequest.dto";
import { ResendOtpRespone } from "../../../Dtos/password-recover/ResendOtpRespone.dto";
import { ResendOtpCommandHandler } from "../../../Command/Handlers/ResendOtpCommandHandler";

export class ResendOtpUseCase {
  constructor(
    private readonly emailService: IEmailService,
    private commandHandler: ResendOtpCommandHandler
  ) {}

  public async excute(dto: ResendOtpRequest): Promise<ResendOtpRespone> {
    try {
      const command = await this.commandHandler.handle(dto);
      const { user, otpValue } = command;

      try {
        await this.emailService.resendOtpEmail(user.getEmail(), otpValue);

        return {
          message: "OTP has been resent successfully. Check your email.",
        };
      } catch (emailError: any) {
        console.error("email service fail", emailError);
        throw emailError;
      }
    } catch (error: any) {
      console.error("Failed to resend email  OTP code:", error.message);
      throw error;
    }
  }
}
