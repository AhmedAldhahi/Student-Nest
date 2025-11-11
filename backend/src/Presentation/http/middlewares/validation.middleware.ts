import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

/**
 * @middleware validation
 *
 * Validates incoming request data against a provided Zod schema.
 *
 * @description
 * This middleware factory takes a Zod schema as input and returns
 * an Express middleware function that:
 * 1. Validates `req.body` using `schema.safeParse()`.
 * 2. Sends a 400 Bad Request response if validation fails.
 * 3. Replaces `req.body` with the validated and parsed data if valid.
 *
 * @param {ZodType<any>} Schema - The Zod validation schema defining expected data structure.
 *
 * @returns {(req: Request, res: Response, next: NextFunction) => void}
 * Returns an Express middleware that validates the request body.
 *
 * @example
 * // Example usage:
 * import { z } from "zod";
 * import { validation } from "../middlewares/validation.middleware";
 *
 * const userSchema = z.object({
 *   name: z.string().min(3),
 *   email: z.string().email(),
 * });
 *
 * router.post("/register", validation(userSchema), registerController);
 */
export const validation = (Schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = Schema.safeParse(req.body);

    if (!result.success) {
      const customizeError = result.error.issues.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));

      //result.error.issues[0].message;
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: customizeError,
      });
      return;
    }

    req.body = result.data;
    next();
  };
};