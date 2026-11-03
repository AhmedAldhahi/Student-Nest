import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const createLeaseRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  limit: 5, // Max 5 attempts per hour
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many lease creation attempts. Please contact support if you are having issues.",
    });
  },
});