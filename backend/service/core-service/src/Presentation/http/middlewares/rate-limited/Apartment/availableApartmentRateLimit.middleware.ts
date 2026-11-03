import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const availableApartmentRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minute window
  limit: 60, // Max 60 refreshes/searches per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many search requests. Please slow down.",
    });
  },
});