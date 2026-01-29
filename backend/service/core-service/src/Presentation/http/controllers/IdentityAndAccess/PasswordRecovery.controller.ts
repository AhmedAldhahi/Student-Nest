import { Request, Response } from "express";
import { ResendOtpForgetPassCommandHandler } from "../../../../Application/BoundedContexts/IdentityAndAccess/CommandHandler/ResendOtpForgetPassCommandHandler";
import { VerifiedOTPForgetPassCommandHandler } from "../../../../Application/BoundedContexts/IdentityAndAccess/CommandHandler/VerfiedOtpResetPassCommandHandler";
import { UpdateForgetPasswordCommandHandler } from "../../../../Application/BoundedContexts/IdentityAndAccess/CommandHandler/UpdateForgetPasswordCommandHandler";

export class PasswordRecoverController {
  constructor(
    private readonly resendOtpForgetPassCH: ResendOtpForgetPassCommandHandler,
    private readonly verifiedOtpForgetPassCH: VerifiedOTPForgetPassCommandHandler,
    private readonly  UpdateForgetPasswordCH: UpdateForgetPasswordCommandHandler
  ) {}

  public changeForgetPassword = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const dto = req.body;
      const result = await this.UpdateForgetPasswordCH.handle(dto);

      return res.status(200).json(result);
    } catch (error: any) {
      console.log("failed to update forgetting password !!");
      const status = error.statusCode || 400;
      return res
        .status(status)
        .json({ message: error.message || "failed password change" });
    }
  };

  public createResendForgetPasswordOtp = async (
    req: Request,
    res: Response
  ) => {
    try {
      const dto = req.body;
      const result = await this.resendOtpForgetPassCH.handle(dto);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "server Error" });
    }
  };

  public createVerifiedResendPasswordOTP = async (
    req: Request,
    res: Response
  ) => {
    try {
      const dto = req.body;
      const result = await this.verifiedOtpForgetPassCH.handle(dto);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ err: error.message || "server Error " });
    }
  };
}
