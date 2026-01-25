import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const updateApartmentRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  limit: 30, // Max 30 update/upload requests per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many updates or uploads. Please wait a few minutes.",
    });
  },
});
