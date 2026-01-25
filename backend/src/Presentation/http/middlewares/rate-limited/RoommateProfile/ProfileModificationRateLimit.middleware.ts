import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const profileModificationRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  limit: 20, // Max 20 updates per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many profile updates. Please wait a while.",
    });
  },
});