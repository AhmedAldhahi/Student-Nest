import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const globalSharedRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 500, 
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests to shared services. Please wait a while.",
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Rate limit exceeded. You are making too many requests.",
    });
  },
});