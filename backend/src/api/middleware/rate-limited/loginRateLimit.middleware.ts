import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const loginRateLimited = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min window
  limit: 10, // Max 3 resends per window
  keyGenerator: (req: Request, res: Response) => req.body.email || req.ip, // per email or fallback to IP
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message:
        "Too many login requests. Please wait a while before trying again.",
    });
  },
});
