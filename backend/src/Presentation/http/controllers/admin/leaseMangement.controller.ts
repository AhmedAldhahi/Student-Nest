import { FindAllLeaseUseCase } from "../../../../Application/Use-Case/admin/LeaseMangament/FindAllLease.usecase";
import { Request, Response } from "express";
import { FindLeasesByIdUseCase } from "../../../../Application/Use-Case/admin/LeaseMangament/FindLeaseByID.usecase";
export class LeaseManagementController {
  constructor(
    private readonly GetAllLease: FindAllLeaseUseCase,
    private readonly findLeaseById: FindLeasesByIdUseCase
  ) {}

  public getAllLease = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.GetAllLease.execute();
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public getLeaseById = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { id } = req.params;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.findLeaseById.execute(Number(id));

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
