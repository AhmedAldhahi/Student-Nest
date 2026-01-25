import rateLimit from "express-rate-limit";
import { Request, Response } from "express";


export const getApartmentRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minute window
  limit: 50, // Max 50 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many requests. Please wait a while.",
    });
  },
});