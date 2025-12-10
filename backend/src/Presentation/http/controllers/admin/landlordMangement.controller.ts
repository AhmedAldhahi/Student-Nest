import { NextFunction, Request, Response } from "express";
import { GetAllLandlordUseCase } from "../../../../Application/use-case/admin/LandlordMangamement/GetAllLandlords.usecase";
import { EditLandlordVerificationStatusUseCase } from "../../../../Application/use-case/admin/LandlordMangamement/EditLandlordVerificationStatus.usecase";
import { booleanCheckFromString2BooleanHelper } from "../../../../Shared/utils/booleanCheke.util";

export class LandloardManagementController {
  constructor(
    private readonly GetAllLandlords: GetAllLandlordUseCase,
    private readonly updateLanadlordsVerfidStatus: EditLandlordVerificationStatusUseCase
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
}
