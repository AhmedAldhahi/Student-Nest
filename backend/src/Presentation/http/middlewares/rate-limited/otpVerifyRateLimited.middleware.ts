import { rateLimit } from "express-rate-limit";
import { Request, Response } from "express";

// OTP verification rate limiter
export const otpVerifyRateLimited = rateLimit({
  windowMs: 5 * 60 * 1000, // 10 min window
  limit: 3, // Max 3 resend per window
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message:
        "Too many login requests. Please wait a while before trying again.",
    });
  },
});
