import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const getLeaseRequestsLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  limit: 60, // Max 60 refreshes/fetches per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many requests for lease applications. Please wait.",
    });
  },
});