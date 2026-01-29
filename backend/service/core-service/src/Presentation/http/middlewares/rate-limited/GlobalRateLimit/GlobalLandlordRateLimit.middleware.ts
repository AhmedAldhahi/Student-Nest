import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const globalLandlordRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  limit: 200, // Max 200 requests total across all landlord routes
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many landlord requests. Please wait a while.",
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Rate limit exceeded. You are making too many requests.",
    });
  },
});