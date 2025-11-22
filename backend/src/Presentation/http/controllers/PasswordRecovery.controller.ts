import { ForgetPasswordUseCase } from "../../../Application/use-case/ForgetPasswordUseCase.usecase";
import { Request, Response } from "express";
import { ResendOtpForgetPasswordUseCase } from "../../../Application/use-case/ResendOtpForgetPasswordUseCase.usecase";

export class PasswordRecoverController {
  constructor(
    private readonly forgetPassword: ForgetPasswordUseCase,
    private readonly resendOtpForgetPassUseCase: ResendOtpForgetPasswordUseCase
  ) {}

  public changeForgetPassword = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const dto = req.body;
      const result = await this.forgetPassword.execute(dto);

      return res.status(200).json(result);
    } catch (err: any) {
      console.log("failed to update forgetting password !!");
      const status = err.statusCode || 400;
      return res
        .status(status)
        .json({ message: err.message || "failed password change" });
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
    } catch (err: any) {
      res.status(400).json({ err: err.message || "server Error" });
    }
  };
}
