import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const deleteApartmentRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  limit: 10, // Max 10 deletions per hour
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many deletion requests. Limit exceeded for safety.",
    });
  },
});