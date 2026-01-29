import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const leaseRetrievalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  limit: 60, // Max 60 requests (approx 4 per minute)
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many lease data requests. Please wait a while.",
    });
  },
});