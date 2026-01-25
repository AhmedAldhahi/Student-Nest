import { Request, Response } from "express";
import rateLimit from "express-rate-limit";


export const getNotificationRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  limit: 150, // Max 150 fetches per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many notification checks. Please wait a while.",
    });
  },
});