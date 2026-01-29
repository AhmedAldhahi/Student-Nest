import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const paymentHistoryRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  limit: 100, // Max 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many payment history requests. Please wait a while.",
    });
  },
});

