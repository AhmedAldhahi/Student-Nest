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
      try {
        await this.emailService.sendRegistrationEmail(
          user.getEmail(),
          user.getOtpForEmail()!
        );
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
