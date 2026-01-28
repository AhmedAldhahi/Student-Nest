import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

// export const registerApiRateLimited = rateLimit({
//   windowMs: 60 * 60 * 1000, // 1 hour window
//   limit: 5, // Max 5 registration attempts per window
//   standardHeaders: 'draft-8', // compliant with the RateLimit header draft-8
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//   ipv6Subnet: 56, // Treat addresses in the same /56 subnet as the same client (useful for IPv6)
//   handler: (req: Request, res: Response) => {
//     res.status(429).json({
//       success: false,
//       message: 'Too many registration attempts. Please try again later.',
//     });
//   },
// });

export const registerApiRateLimited = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,

  skip: (req: Request) => {
    // If the IP matches your specific IP, skip the rate limit
    const myIp = "72.60.35.224";
    if (req.ip === myIp) return true;

    if (req.ip === '::1' || req.ip === '127.0.0.1') return true;

    // OR: Skip if a specific secret header is present (easier for testing)
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
