import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const globalAdminRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  limit: 100, // Max 100 requests total across all admin routes per window
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many admin requests. Please wait a while.",
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Admin rate limit exceeded. You are sending too many requests.",
    });
  },
});