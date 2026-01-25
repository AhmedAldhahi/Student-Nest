import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const loginUpdatePasswordRateLimited = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3,



    handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      error: "Too many update password attempts. Please wait a while before trying again",
    });
  },

  standardHeaders: true,
  legacyHeaders: false,


});
