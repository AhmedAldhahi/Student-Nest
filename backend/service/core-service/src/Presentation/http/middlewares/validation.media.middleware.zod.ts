import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validationMedia = (Schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    
    // 1. WRAP the data to match your Schema structure
    // This creates the { body: ..., files: ... } shape Zod is looking for
    const dataToValidate = {
      body: req.body,
      files: req.files || req.file, // Handles both .fields() and .single()
    };

    // 2. Validate the WRAPPED object
    const result = Schema.safeParse(dataToValidate);

    if (!result.success) {
      const firstIssue = result.error.issues[0];
      
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: {
          // joins path to show "body.price" or "files.apartmentPhoto"
          path: firstIssue.path.join("."), 
          message: firstIssue.message,
        },
      });
      return;
    }

    // 3. Update req.body with the parsed/coerced data
    // We only extract the 'body' part back into req.body for the controller
    req.body = result.data.body;
    
    next();
  };
};