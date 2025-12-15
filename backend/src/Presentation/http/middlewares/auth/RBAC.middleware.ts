import { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject } from "zod";
import {
  adminProfileSchema,
  studentProfileSchema,
  landlordProfileSchema,
} from "../../validation/profileValidation.zod";
import { AppDataSource } from "../../../../Infrastructure/Database/orm/TypeOrm/data-source";
import { UserModel } from "../../../../Infrastructure/Database/orm/TypeOrm/entity/User.entity";

export const RBAC = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: "No user found !!" });

    const userRepo = AppDataSource.getInstance().getRepository(UserModel);
    const user = await userRepo.findOne({ where: { userId: userId } });

    if (!user) return res.status(404).json({ error: "User not found !!" });

    const role = user.Role;

    // 2. Select Schema
    let schema: ZodObject<any>;

    switch (role) {
      case "admin":
        schema = adminProfileSchema;
        break;
      case "student":
        schema = studentProfileSchema;
        break;
      case "landloard":
        schema = landlordProfileSchema;
        break;
      default:
        return res.status(403).json({ error: "Forbidden: Invalid role" });
    }

    // 3. EXTRACT FILES
    const files = req.files as
      | { [key: string]: Express.Multer.File[] }
      | undefined;

    // Check if specific files exist
    const photoFile = files?.["photo"]?.[0];
    const verificationDoc = files?.["verificationFile"]?.[0];

    // 4. PREPARE DATA (The Fix is Here 👇)
    const dataToValidate = {
      ...req.body,

      // ONLY add the 'photo' key if a photo was actually uploaded
      ...(photoFile && { photo: photoFile }),

      // ONLY add the 'verificationFiles' key if a doc was actually uploaded
      // If undefined, this key is completely omitted, so Admin/Landlord schema won't complain.
      ...(verificationDoc && { verificationFiles: verificationDoc }),
    };

    // 5. Validate
    await schema.parseAsync(dataToValidate);

    return next();
  } catch (error: any) {
    if (error instanceof ZodError) {
      const unauthorized = error.issues.find(
        (e) => e.code === "unrecognized_keys"
      );

      if (unauthorized) {
        // @ts-ignore
        const keys = unauthorized.keys
          ? unauthorized.keys.join(", ")
          : "unknown field";
        return res.status(403).json({
          error: "not Authorization or unknown field !!",
        });
      }

      return res.status(400).json({
        error: "validation error " + error.message,
      });
    }

    console.error("RBAC Middleware Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
