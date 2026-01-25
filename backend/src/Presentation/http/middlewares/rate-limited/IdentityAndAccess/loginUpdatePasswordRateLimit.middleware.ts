import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const loginUpdatePasswordRateLimited = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3,

  keyGenerator: (req: Request, res: Response) => {
    const ip = req.ip || req.socket.remoteAddress || "unknown";
    const email = req.body.email || "";
    return email ? `${ip}_${email}` : ip;
  },

  standardHeaders: true,
  legacyHeaders: false,

  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,

      message:
        "Too many update password attempts. Please wait a while before trying again.",
    });
  },
});
