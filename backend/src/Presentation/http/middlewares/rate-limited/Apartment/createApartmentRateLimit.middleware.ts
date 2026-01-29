import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

// 1. Creation Limit (Strict)
// Creating an apartment involves multiple file uploads and DB writes.
export const createApartmentRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  limit: 50, // Max 10 new apartments per hour (prevents spamming the platform)
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "You are creating too many apartments. Please take a break.",
    });
  },
});