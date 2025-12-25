import { Request, Response } from "express";
import { DeleteLandlordByIdUseCase } from "../../../../Application/Use-Case/admin/UserMangament/DeleteUserById.usecase";
import { EditLandlordVerificationStatusUseCase } from "../../../../Application/Use-Case/admin/UserMangament/EditLandlordVerificationStatus.usecase";
import { FindUserByQueryUseCase } from "../../../../Application/Use-Case/admin/UserMangament/FindUserByQuery.usecase";
import { GetAllUserUseCase } from "../../../../Application/Use-Case/admin/UserMangament/GetAllUser.usecase";
import { UserRole } from "../../../../Domain/Enum/UserRole.enum";
import { EditUserActivateStatsUseCase } from "../../../../Application/Use-Case/admin/UserMangament/EditUserActivateStatus.usecase";

export class UserManagementController {
  constructor(
    //  private readonly GetAllLandlords: GetAllLandlordUseCase,
    private readonly GetAllUsers: GetAllUserUseCase,
    private readonly updateLanadlordsVerfidStatus: EditLandlordVerificationStatusUseCase,
    private readonly deleteLandlord: DeleteLandlordByIdUseCase,
    private readonly findUserByQuery: FindUserByQueryUseCase,
    private readonly updateUserActivateUseCase: EditUserActivateStatsUseCase
  ) {}

  public getAllUsers = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const { userRole } = req.params;

      const result = await this.GetAllUsers.execute(userRole as UserRole);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public updateLandlordVerifiedStatus = async (req: Request, res: Response) => {
    try {
      const { landlordId } = req.params;

      // Because we used .transform() in Zod, req.body.Verified is already a boolean now!
      const { Verified } = req.body;
      const userId = req.user?.userId;

      console.log("parameter id : ", landlordId);
      console.log("Verified status : ", Verified); // Should be true/false (boolean)

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.updateLanadlordsVerfidStatus.execute(
        landlordId,
        { Verified }
      );
      return res.status(201).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public deleteLandlordById = async (req: Request, res: Response) => {
    try {
      const userid = req.user?.userId;
      const { userId } = req.params;

      if (!userid)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.deleteLandlord.execute(userId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public findUsersByQuery = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { query } = req.params;
      const { userRole } = req.params;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.findUserByQuery.execute(
        query,
        userRole as UserRole
      );
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public updateActivateStatus = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const dto = req.body;
      const { id } = req.params;
      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.updateUserActivateUseCase.execute(dto, id);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
