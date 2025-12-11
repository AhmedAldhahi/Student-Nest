import { NextFunction, Request, Response } from "express";
import { GetAllLandlordUseCase } from "../../../../Application/use-case/admin/LandlordMangamement/GetAllLandlords.usecase";
import { EditLandlordVerificationStatusUseCase } from "../../../../Application/use-case/admin/LandlordMangamement/EditLandlordVerificationStatus.usecase";
import { DeleteLandlordByIdUseCase } from "../../../../Application/use-case/admin/LandlordMangamement/DeleteLandlordById.usecase";
import { FindUserByEmailUseCase } from "../../../../Application/use-case/admin/LandlordMangamement/FindUserByEmail.usecase";
import { error } from "console";
import { GetAllStudentUseCase } from "../../../../Application/use-case/admin/LandlordMangamement/GetAllStudents.usecase";

export class UserManagementController {
  constructor(
    private readonly GetAllLandlords: GetAllLandlordUseCase,
    private readonly updateLanadlordsVerfidStatus: EditLandlordVerificationStatusUseCase,
    private readonly deleteLandlord: DeleteLandlordByIdUseCase,
    private readonly findUserByEmail: FindUserByEmailUseCase,
    private readonly GetAllStudents: GetAllStudentUseCase
  ) {}

  public getAllLandlords = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?.userId;
      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.GetAllLandlords.execute();
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
      const { landlordId } = req.params;

      if (!userid)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.deleteLandlord.execute(landlordId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public findUsersByEmail = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { email } = req.params;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.findUserByEmail.execute(email);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public getAllStudents = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.GetAllStudents.execute();
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
