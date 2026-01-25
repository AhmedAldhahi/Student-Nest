import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

const getIp = (req: Request) => req.ip || req.socket.remoteAddress || "unknown";

export const loginRateLimited = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,

  keyGenerator: (req: Request, res: Response): string => {
    if (req.body && req.body.email) {
      return `${getIp(req)}_${req.body.email}`;
    }

    if (req.headers["x-api-key"]) {
      return req.headers["x-api-key"] as string;
    }

    return getIp(req);
  },

  message: {
    status: 429,
    error: "Too many login attempts, please try again after 15 minutes.",
  },

  skipSuccessfulRequests: true,
});
