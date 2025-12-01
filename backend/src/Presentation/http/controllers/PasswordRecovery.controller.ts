import { ForgetPasswordUseCase } from "../../../Application/use-case/Verfication/ForgetPassword/ForgetPasswordUseCase.usecase";
import { Request, Response } from "express";
import { VerifiedForgetPasswordOtpUseCase } from "../../../Application/use-case/Verfication/ForgetPassword/VerfiedForgetPasswordOtpUseCase.usecase";
import { ResendOtpForgetPasswordUseCase } from "../../../Application/use-case/Verfication/ForgetPassword/ResendOtpForgetPasswordUseCase.usecase";

export class PasswordRecoverController {
  constructor(
    private readonly forgetPassword: ForgetPasswordUseCase,
    private readonly resendOtpForgetPassUseCase: ResendOtpForgetPasswordUseCase,
    private readonly verifiedOtpForgetPassUseCase: VerifiedForgetPasswordOtpUseCase
  ) {}

  public changeForgetPassword = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const dto = req.body;
      const result = await this.forgetPassword.execute(dto);

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
      const result = await this.resendOtpForgetPassUseCase.excute(dto);
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
      const result = await this.verifiedOtpForgetPassUseCase.execute(dto);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ err: error.message || "server Error " });
    }
  };
}
