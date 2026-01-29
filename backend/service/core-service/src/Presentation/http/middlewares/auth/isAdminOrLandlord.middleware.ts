import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../../../Infrastructure/Database/TypeOrm/data-source";
import { UserModel } from "../../../../Infrastructure/Database/TypeOrm/entity/User.entity";
import { UserRole } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Enum/UserRole.enum";

export const isAdminOrLandlord = async (
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

    if (user?.Role === UserRole.student)
      return res
        .status(400)
        .json({ error: "Forbidden  you do not have landlord privilege" });

    return next();
  } catch (error: any) {
    return res.status(400).json({ error: "internal server error" });
  }
};
