import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const userModificationRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20, // Max 20 modifications per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many modification requests. Please wait a while.",
    });
  },
});