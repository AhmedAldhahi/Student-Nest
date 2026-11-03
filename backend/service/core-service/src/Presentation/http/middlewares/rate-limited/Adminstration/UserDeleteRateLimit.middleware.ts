import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const userDeletionRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 50, // Max 10 deletions per hour
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many deletion requests. Limit exceeded for safety.",
    });
  },
});