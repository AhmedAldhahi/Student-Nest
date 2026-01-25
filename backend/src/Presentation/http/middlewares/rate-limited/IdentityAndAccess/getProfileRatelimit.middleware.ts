import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

const getIp = (req: Request) => req.ip || req.socket.remoteAddress || "unknown";

export const GetProfileRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,

  keyGenerator: (req: Request, res: Response) => {
    if (req.user && req.user.userId) {
      return req.user.userId;
    }
    return getIp(req);
  },

  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      error: "Too many profile requests. Please wait a minute.",
    });
  },

  standardHeaders: true,
  legacyHeaders: false,
});
