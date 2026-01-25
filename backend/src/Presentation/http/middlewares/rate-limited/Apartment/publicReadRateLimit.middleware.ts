import { Request, Response } from "express";
import rateLimit from "express-rate-limit";


export const publicReadRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  limit: 100, // Max 100 requests (Generous for browsing, tight for bots)
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many requests. Please wait a while.",
    });
  },
});