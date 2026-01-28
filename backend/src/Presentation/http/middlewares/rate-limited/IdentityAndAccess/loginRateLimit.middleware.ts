import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

const getIp = (req: Request) => req.ip || req.socket.remoteAddress || "unknown";

export const loginRateLimited = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,

  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      error: "Too many login attempts, please try again after 15 minutes.",
    });
  },

  skipSuccessfulRequests: false,
});
