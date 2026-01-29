import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const createLeaseRequestRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 1 hour window
  limit: 10, // Max 10 applications per hour
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "You have sent too many applications recently. Please wait a while.",
    });
  },
});