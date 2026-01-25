import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

export const registerApiRateLimited = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  limit: 5, // Max 5 registration attempts per window
  standardHeaders: 'draft-8', // compliant with the RateLimit header draft-8
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  ipv6Subnet: 56, // Treat addresses in the same /56 subnet as the same client (useful for IPv6)
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: 'Too many registration attempts. Please try again later.',
    });
  },
});