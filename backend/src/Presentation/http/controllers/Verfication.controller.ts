import { ResendOtpUseCase } from "../../../Application/use-case/ResendOtpUseCase.usecase";
import { Request, Response } from "express";

export class VerficationController {
    constructor(private readonly resendOtpUseCase: ResendOtpUseCase) {}
  
    // ✅ Fix: Change to an arrow function to bind 'this'
    public createResendOtp = async (req: Request, res: Response) => {
      try {
        const dto = req.body;
        // This line will now work
        const result = await this.resendOtpUseCase.excute(dto); 
        return res.status(200).json(result);
      } catch (error: any) {
        if (error.message === "failed to resend otp!1") { // This message is a typo
          return res.status(409).json({ message: error.message });
        }
  
        const status = error.statusCode || 400;
        return res
          .status(status)
          .json({ error: error.message || "server Error" });
      }
    }
  }