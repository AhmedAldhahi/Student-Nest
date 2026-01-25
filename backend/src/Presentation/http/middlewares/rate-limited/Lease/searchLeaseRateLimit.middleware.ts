import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const searchLeasesRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minute window
  limit: 30, // Max 30 search requests per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many search attempts. Please slow down.",
    });
  },
});