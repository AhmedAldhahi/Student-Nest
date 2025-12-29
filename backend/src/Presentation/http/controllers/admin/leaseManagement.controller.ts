import { FindAllLeaseUseCase } from "../../../../Application/Use-Case/admin/LeaseManagement/FindAllLease.usecase";
import { Request, Response } from "express";
import { FindLeasesByIdUseCase } from "../../../../Application/Use-Case/admin/LeaseManagement/FindLeaseByQuery.usecase";
export class LeaseManagementController {
  constructor(
    private readonly GetAllLease: FindAllLeaseUseCase,
    private readonly findLeaseByQuery: FindLeasesByIdUseCase
  ) {}

  public getAllLease = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.GetAllLease.execute(userId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public getLeaseByQuery = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const query = (req.query.q as string) || "";

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.findLeaseByQuery.execute(query, userId);

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}
