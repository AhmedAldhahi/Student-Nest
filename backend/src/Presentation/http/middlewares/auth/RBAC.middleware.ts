import { NextFunction, Request, Response } from "express";
import {
  adminProfileSchema,
  studentProfileSchema,
  landlordProfileSchema,
} from "../../validation/profileValidation.zod";
import { AppDataSource } from "../../../../Infrastructure/database/orm/TypeOrm/data-source";
import { UserModel } from "../../../../Infrastructure/database/orm/TypeOrm/entity/User.entity";
import { validation } from "../validation.middleware"; // Import the validation middleware

export const RBAC = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userid = req.user?.userId;

    if (!userid) return res.status(401).json({ error: "No user found !!" });

    const userRepo = AppDataSource.getInstance().getRepository(UserModel);
    const user = await userRepo.findOne({ where: { userId: userid } });

    if (!user) {
      return res.status(404).json({ error: "User not found !!" });
    }

    const role = user?.Role;

    switch (role) {
      case "admin":
        return validation(adminProfileSchema)(req, res, next);

      case "student":
        return validation(studentProfileSchema)(req, res, next); 

      case "landloard":
        return validation(landlordProfileSchema)(req, res, next); 

      default:
        return res
          .status(403)
          .json({ error: "Forbidden: Invalid role for this operation" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
