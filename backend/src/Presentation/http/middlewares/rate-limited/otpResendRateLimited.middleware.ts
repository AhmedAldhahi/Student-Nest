import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const otpResendRateLimited = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min window
  limit: 3, // Max 3 resend per window
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message:
        "Too many login requests. Please wait a while before trying again.",
    });
  },
});
