import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const otpResendRateLimited = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 3,
  standardHeaders: true,
  legacyHeaders: false,
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
      message:
        "Too many resend attempts. Please wait 15 minutes before trying again.",
    });
  },
});
