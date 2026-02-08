import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../../../Infrastructure/Database/TypeOrm/data-source";
import { UserModel } from "../../../../Infrastructure/Database/TypeOrm/entity/User.entity";
import { UserRole } from "../../../../Domain/Shared/Enum/UserRole.enum";

export const isGuest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;

    const user = await AppDataSource.getInstance()
      .getRepository(UserModel)
      .findOne({ where: { userId: userId } });

    if (!userId) user?.Role === UserRole.Guest;

    return next();
  } catch (error: any) {
    return res.status(500).json({ error: "Internal Server Error " });
  }
};
