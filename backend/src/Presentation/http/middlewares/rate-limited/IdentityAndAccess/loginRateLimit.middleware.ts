import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

const getIp = (req: Request) => req.ip || req.socket.remoteAddress || "unknown";

export const loginRateLimited = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,

  skip: (req: Request) => {
    // If the IP matches your specific IP, skip the rate limit
    const myIp = "72.60.35.224";
    if (req.ip === myIp) return true;

    if (req.ip === "::1" || req.ip === "127.0.0.1") return true;

    // OR: Skip if a specific secret header is present (easier for testing)
    if (req.headers["x-bypass-limit"] === "my-secret-token") return true;

    return false;
  },

  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      error: "Too many login attempts, please try again after 15 minutes.",
    });
  },

  skipSuccessfulRequests: false,
});
