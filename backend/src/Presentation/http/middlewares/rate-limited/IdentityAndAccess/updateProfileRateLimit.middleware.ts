import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const updateProfile = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min window
  limit: 10, // Max 10 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers

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
        "Too many profile update requests. Please wait a while before trying again.",
    });
  },
});
