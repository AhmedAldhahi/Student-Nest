import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

// OTP verification rate limiter
export const otpVerifyRateLimited = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min window
  limit: 5, // Max 5 verification attempts per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many verification attempts. Please wait 10 minutes before trying again.",
    });
  },
});