import { UserRegisteredEvent } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Events/UserRegisterdEvent.event";
import { IHandle } from "../../../../Domain/Shared/Event/IHandle";
import { IEmailService } from "../../../Interfaces/IEmail.interface";

export class SendVerificationEmailHandler
  implements IHandle<UserRegisteredEvent>
{
  constructor(private readonly emailService: IEmailService) {}

  public async handle(event: UserRegisteredEvent): Promise<void> {
    try {
      const { email, otpCode } = event;

      if (!email) throw new Error("the email event is missed !!");

      if (!otpCode) throw new Error("the otp code is missed !!");

      await this.emailService.sendRegistrationEmail(email, otpCode);
    } catch (error: any) {
      console.error("fail to send email service !!", error);
      throw error;
    }
  }
}
