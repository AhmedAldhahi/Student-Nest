import { Request, Response } from "express";
import { VerifiedOtpUseCase } from "../../../Application/use-case/VerfiedOtpUseCase.usecase";
import { ResendOtpUseCase } from "../../../Application/use-case/ResendOtpUseCase.usecase";

export class VerificationController {
  constructor(
    private readonly resendOtpUseCase: ResendOtpUseCase,
    private readonly verifiedOtpUseCase: VerifiedOtpUseCase
  ) {}

  public createResendOtp = async (req: Request, res: Response) => {
    try {
      const dto = req.body;
      const result = await this.resendOtpUseCase.excute(dto);
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
      const result = await this.verifiedOtpUseCase.execute(dto);
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  };
}
