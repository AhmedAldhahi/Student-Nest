import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const deleteNotificationRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  limit: 20, // Max 20 deletion requests per hour
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many deletion requests. Limit exceeded.",
    });
  },
});