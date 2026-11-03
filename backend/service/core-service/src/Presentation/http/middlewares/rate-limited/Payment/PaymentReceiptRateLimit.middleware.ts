import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const paymentReceiptUploadRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  limit: 20, // Max 10 upload attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many receipt uploads. Please wait a few minutes.",
    });
  },
});