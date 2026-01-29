import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validation = (Schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = Schema.safeParse(req.body);

    if (!result.success) {
      const firstIssue = result.error.issues[0];
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: {
          path: firstIssue.path.join("."),
          message: firstIssue.message,
        },
      });
      return;
    }

    req.body = result.data;
    next();
  };
};
