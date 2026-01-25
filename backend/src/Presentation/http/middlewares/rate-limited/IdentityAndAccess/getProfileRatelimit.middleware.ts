import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

const getIp = (req: Request) => req.ip || req.socket.remoteAddress || "unknown";

export const GetProfileRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,

  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      error: "Too many profile requests. Please wait a minute.",
    });
  },

  standardHeaders: true,
  legacyHeaders: false,
});
