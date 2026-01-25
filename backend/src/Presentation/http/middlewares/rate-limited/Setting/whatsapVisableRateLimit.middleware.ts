import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const updateSettingRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  limit: 10, // Max 10 updates per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many setting updates. Please wait a while.",
    });
  },
});