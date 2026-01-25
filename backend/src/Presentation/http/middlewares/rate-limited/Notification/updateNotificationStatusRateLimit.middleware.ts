import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const updateNotificationStatusRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  limit: 50, // Max 50 updates per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many status updates. Please wait a while.",
    });
  },
});