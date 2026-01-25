import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const profileRetrievalRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minute window
  limit: 50, 
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many profile requests. Please wait a while.",
    });
  },
});