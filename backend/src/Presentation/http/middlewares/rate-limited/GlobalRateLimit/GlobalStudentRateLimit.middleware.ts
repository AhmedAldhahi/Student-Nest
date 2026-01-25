import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const globalStudentRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  limit: 300, // Max 300 requests total (Students browse frequently)
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests. Please wait a while.",
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Rate limit exceeded. You are making too many requests.",
    });
  },
});