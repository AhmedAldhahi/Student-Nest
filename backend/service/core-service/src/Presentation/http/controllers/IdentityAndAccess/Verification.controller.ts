import { Request, Response } from "express";
import { ResendOtpCommandHandler } from "../../../../Application/BoundedContexts/IdentityAndAccess/CommandHandler/ResendOtpCommandHandler";
import { VerifiedOtpCommandHandler } from "../../../../Application/BoundedContexts/IdentityAndAccess/CommandHandler/VerfiedOtpCommandHandler";
export class VerificationController {
  constructor(
    private readonly resendOtpCH: ResendOtpCommandHandler,
    private readonly verifiedOtpCH: VerifiedOtpCommandHandler
  ) {}

  public createResendOtp = async (req: Request, res: Response) => {
    try {
      const dto = req.body;
      const result = await this.resendOtpCH.handle(dto);
      return res.status(200).json(result);
    } catch (error: any) {
      if (error.message === "failed to resend otp!1") {
        return res.status(409).json({ message: error.message });
      }

      const status = error.statusCode || 400;
      return res
        .status(status)
        .json({ error: error.message || "server Error" });
    }
  };

  public createVerifiedOtp = async (req: Request, res: Response) => {
    try {
      const dto = req.body;
      const result = await this.verifiedOtpCH.handle(dto);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };
}
