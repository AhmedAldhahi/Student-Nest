import { rateLimit } from 'express-rate-limit';
import { Request, Response } from 'express';

// OTP verification rate limiter
export const otpVerifyRateLimited = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes window for OTP
  limit: 3, // Max 3 OTP verification attempts per window
  keyGenerator: (req: Request) => req.body.email || req.ip, // limit per email or fallback to IP
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: 'Too many OTP verification attempts. Please request a new OTP or wait a few minutes.',
    });
  },
});
