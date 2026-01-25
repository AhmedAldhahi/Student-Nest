import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const searchAuditLogsRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minute window
  limit: 20, // Max 20 search requests per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many search requests. Please wait a while.",
    });
  },
});