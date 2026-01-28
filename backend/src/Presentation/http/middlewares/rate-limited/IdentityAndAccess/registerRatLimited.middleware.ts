import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const registerApiRateLimited = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,

  skip: (req: Request) => {
    const myIp = "YOUR_PUBLIC_IP_HERE";
    if (req.ip === myIp) return true;

    if (req.headers["x-bypass-limit"] === "my-secret-token") return true;

    return false;
  },

  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many registration attempts.",
    });
  },
});
