import rateLimit from "express-rate-limit";
import { Request, Response } from "express";
import { testRate } from "../../../../Shared/constants/validationZod.constant";

export const loginUpdatePasswordRateLimited = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min window
  limit: testRate, // Max 3 resends per window
  keyGenerator: (req: Request, res: Response) => req.body.email || req.ip, // per email or fallback to IP
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message:
        "Too many update password atemp requests. Please wait a while before trying again.",
    });
  },
});


// 3 