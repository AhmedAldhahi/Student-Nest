import rateLimit from "express-rate-limit";
import { Request,Response } from "express";

export const authenticatedSearchRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minute window
  limit: 60, // Max 60 searches per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many search requests. Please slow down.",
    });
  },
});