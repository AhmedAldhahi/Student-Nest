import { RegisterLandloardRequest } from "../../Dtos/registeration/RegisterLandloardRequest.dtos";
import { RegisterLandloardRespone } from "../../Dtos/registeration/RegisterLandloardRespone.dtos";
import { IEmailService } from "../../Interfaces/IEmail.interface";
import { CreateLandlordCommandHandler } from "../../Command/Handlers/CreateLandlordCommandHandler";

export class RegisterLandloardUseCase {
  constructor(
    private readonly emailService: IEmailService,
    private readonly commandHandler: CreateLandlordCommandHandler
  ) {}

  public async execute(
    dto: RegisterLandloardRequest
  ): Promise<RegisterLandloardRespone> {
    const user = await this.commandHandler.handle(dto);

    try {
      const email = user.getEmail();
      const otp = user.getOtpForEmail();

      if (!email || !otp) {
        throw new Error("email or otp is missed !!");
      }

      try {
        await this.emailService.sendRegistrationEmail(email, otp);
      } catch (emailErr) {
        console.log("email service failed!!", emailErr);
      }

      return {
        message:
          "Landlord registered successfully! Verify your email with the OTP.",
      };
    } catch (error: any) {
      console.error("Error during registration process: ", error);
      throw error;
    }
  }
}
