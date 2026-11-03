import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../../../Infrastructure/Database/TypeOrm/data-source";
import { UserModel } from "../../../../Infrastructure/Database/TypeOrm/entity/User.entity";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * get authorize user
   * check the role
   * check it have user id from request
   * check that user id is found in db
   * check the role is admin
   */

  const userId = req.user?.userId;
  try {
    if (!userId)
      return res
        .status(400)
        .json({ error: "Unauthorized: No user ID found in payload." });

    const userRepo = AppDataSource.getInstance().getRepository(UserModel);
    const user = await userRepo.findOne({ where: { userId: userId } });

    if (!user) {
      return res.status(404).json({ error: "no user found !!" });
    }

    const userRole = user?.Role;

    if (userRole !== "admin")
      return res
        .status(403)
        .json({ error: "Forbidden  you do not have admin privilege " });

    return next();
  } catch (error: any) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
