import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const generalReadRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  limit: 200, // Max 200 requests (Smooth experience for power users)
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many data requests. Please wait a while.",
    });
  },
});