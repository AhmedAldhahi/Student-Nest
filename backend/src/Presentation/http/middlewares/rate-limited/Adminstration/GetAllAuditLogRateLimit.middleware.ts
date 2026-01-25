import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const getAllAuditLogsRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  limit: 50, // Max 50 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many audit log requests. Please wait a while.",
    });
  },
});