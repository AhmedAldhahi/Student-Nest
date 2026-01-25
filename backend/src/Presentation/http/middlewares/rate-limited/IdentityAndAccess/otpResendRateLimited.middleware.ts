import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const otpResendRateLimited = rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 3, 
  standardHeaders: true, 
  legacyHeaders: false, 
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many resend attempts. Please wait 15 minutes before trying again.",
    });
  },
});