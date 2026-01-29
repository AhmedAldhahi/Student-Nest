import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const apartmentVerifyRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  limit: 20, // Max 20 verifications per window (allows for admin batch work)
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    return res.status(429).json({
      success: false,
      message: "Too many verification requests. Please wait a while.",
    });
  },
});
