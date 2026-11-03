import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const userRetrievalRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 50, 
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many data requests. Please wait a while.",
    });
  },
});
