import rateLimit from "express-rate-limit";
import { Request, Response } from "express";
import { testRate } from "../../../../Shared/constants/validationZod.constant";

export const GetProfile = rateLimit({
  windowMs: 5 * 60 * 1000, // 10 min window
  limit: testRate, // Max 3 resend per window
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message:
        "Too many  requests. Please wait a while before trying again.",
    });
  },
}); 



// 5