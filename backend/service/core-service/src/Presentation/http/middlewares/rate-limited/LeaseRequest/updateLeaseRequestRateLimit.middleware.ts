import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const updateLeaseRequestLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  limit: 30, // Max 30 status updates per window (allows batch processing)
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many status updates. Please wait a while.",
    });
  },
});