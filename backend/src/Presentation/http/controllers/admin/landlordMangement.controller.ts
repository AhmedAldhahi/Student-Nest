import { NextFunction, Request, Response } from "express";
import { GetAllLandlordUseCase } from "../../../../Application/use-case/admin/LandlordMangamement/GetAllLandlords.usecase";

export class LandloardManagementController {
  constructor(private readonly GetAllLandlords: GetAllLandlordUseCase) {}

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
}
