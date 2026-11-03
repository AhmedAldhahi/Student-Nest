import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const getAllLeasesRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  limit: 50, // Max 50 requests per window (approx 3 per minute)
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many lease data requests. Please wait a while.",
    });
  },
});