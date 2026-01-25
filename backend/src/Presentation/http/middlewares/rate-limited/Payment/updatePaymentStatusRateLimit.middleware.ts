import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const updatePaymentStatusRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  limit: 30, // Max 30 status updates per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many payment updates. Please wait a while.",
    });
  },
});