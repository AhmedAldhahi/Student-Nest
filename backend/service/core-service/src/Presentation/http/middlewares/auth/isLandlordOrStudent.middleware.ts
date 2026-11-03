import { Request, Response, NextFunction } from "express";
import { UserRole } from "../../../../Domain/Shared/Enum/UserRole.enum";
import { AppDataSource } from "../../../../Infrastructure/Database/TypeOrm/data-source";
import { UserModel } from "../../../../Infrastructure/Database/TypeOrm/entity/User.entity";

export const isLandlordOrStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;

    if (!userId)
      return res
        .status(400)
        .json({ error: "Unauthorized: No user ID found in payload." });

    const user = await AppDataSource.getInstance()
      .getRepository(UserModel)
      .findOne({ where: { userId: userId } });

    if (user?.Role === UserRole.admin || user?.Role === UserRole.Guest)
      return res.status(400).json({
        error: "Forbidden  you do not have landlord  Or Student privilege",
      });

    return next();
  } catch (error: any) {
    return res.status(500).json({ error: "Internal Server Error " });
  }
};
