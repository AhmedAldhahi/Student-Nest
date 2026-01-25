import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const updateProfile = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min window
  limit: 10, // Max 10 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many profile update requests. Please wait a while before trying again.",
    });
  },
});