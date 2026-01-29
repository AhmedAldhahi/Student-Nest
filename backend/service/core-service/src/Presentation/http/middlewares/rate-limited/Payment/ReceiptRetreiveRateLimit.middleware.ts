import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const receiptRetrievalRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minute window
  limit: 50, // Max 50 receipt fetches per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many receipt requests. Please slow down.",
    });
  },
});