import { CreateStudentCommandHandler } from "../../Command/Handlers/CreateStudentCommandHandler";
import { RegisterStudentRequest } from "../../Dtos/registeration/RegisterStudentRequest.dtos";
import { RegisterStudentRespone } from "../../Dtos/registeration/RegisterStudentRespone.dtos";
import { IEmailService } from "../../Interfaces/IEmail.interface";

export class RegisterStudentUseCase {
  constructor(
    private readonly emailService: IEmailService,
    private commandHandler: CreateStudentCommandHandler
  ) {}

  public async execute(
    dto: RegisterStudentRequest
  ): Promise<RegisterStudentRespone> {
    try {
      const user = await this.commandHandler.handle(dto);

      const email = user.getEmail();
      const otp = user.getOtpForEmail();

      if (!email || !otp) {
        throw new Error("email or otp is missed !!");
      }

      try {
        await this.emailService.sendRegistrationEmail(email, otp);
      } catch (emailErr) {
        console.log("email service failed!!", emailErr);
        // Email error should NOT rollback DB transaction
      }

      return {
        message:
          "Student registered successfully! Verify your email with the OTP.",
      };
    } catch (error: any) {
      console.error("Error during registration process: ", error);
      throw error;
    }
  }
}
